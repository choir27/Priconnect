import {useEffect, useState, useMemo, useCallback} from "react"
import {handleDelete} from "../hooks/Comments"
import axios from "axios"

const RenderComments = ({setShowComments, setShowReply, showComments}) => {

    const [postComments, setPostComments] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try{
          const [postResponse] = await Promise.all([
            axios.get("http://localhost:8000/api/posts"),
          ]);
          setPosts(postResponse.data);
        }catch(err){
          console.error(err);
        }
      };

      useMemo(()=>{
        fetchData();
    },[]);
      
    const findComments = useCallback(()=>{
      if(posts){
        const currentPost = posts.find(ele=>ele._id === localStorage.getItem("postId"));
        if(currentPost){
          if(currentPost.comments){
            setPostComments(currentPost.comments);
          }
        }
      } 
       
      },[posts]);

      useMemo(()=>findComments(),[findComments]);

      useEffect(()=>{
        if(postComments){
          const arr = [];
              postComments.forEach((ele,i)=>
              {
                  arr.push(
              <section key = {i} className = "comments flex">
                <ul className = "info">
              <li className = "user">{ele.displayName}  {ele.email}</li>
              <li><h6 className = "text">{ele.comments}</h6></li>
              <ul className = "icons">
              <li className = "flex justifyContent fa-solid fa-thumbs-up button"><span>{ele.likes}</span></li>
              <li 
              className = "flex justifyContent fa-solid fa-comment button" 
              onClick = {()=>{setShowReply(true)
              localStorage.setItem("commentId", ele._id)
              }}><span>{ele.replies.length}</span></li>
              <li className = "flex justifyContent fa-solid fa-trash button" onClick = {(e)=>handleDelete(e,ele._id)}></li>
              </ul>
              </ul>
           
              </section>
                  )
              })
              setShowComments(arr)
        }
      },[postComments, setShowComments, setShowReply]);

      return showComments

}

export default RenderComments