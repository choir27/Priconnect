import {useEffect, useState, useMemo, useCallback} from "react"
import {handleDelete, handleLike, handleReplyDelete, handleReplyLike} from "../hooks/Comments"
import axios from "axios"
import {toast} from "react-toastify"

const RenderComments = ({setShowComments, setShowReply, showComments}) => {

    const [postComments, setPostComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [addHidden, setAddHidden] = useState("");
    const [show, setShow] = useState(false);

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
     
    useEffect(()=>{
      show ? setAddHidden("show") : setAddHidden("hidden");
      
    },[show, setAddHidden]);

    const findComments = useCallback(()=>{
      if (posts) {
        const currentPost = posts.find(
          (ele) => ele._id === localStorage.getItem("postId")
        );
        if (currentPost && currentPost.comments) {
          setPostComments(currentPost.comments);
        }
      }
       
    },[posts]);

      useMemo(()=>findComments(),[findComments]);
      
      useEffect(() => {
        const updatedComments = {};
    
        if (postComments) {
          postComments.forEach((comment) => {
            updatedComments[comment._id] = false;
          });
        }
    
        setShow(updatedComments);
      }, [postComments]);

 
      useEffect(()=>{
        if(postComments){
          const toggleCommentReplies = (commentId) => {
            const updatedComments = { ...show };
            updatedComments[commentId] = !updatedComments[commentId];
            setShow(updatedComments);
          };
    

          const renderReplies = (comment) => {
            if(localStorage.getItem("id")){
            return comment.replies.map(ele=>
              <ul key = {ele._id}  className = {`reply comments flex ${
                show[comment._id] ? "show" : "hidden"
              }`}>
                <ul className = "info">
                      <li className = "user">{ele.displayName}  {ele.email}</li>
                      <li><h6 className = "text">{ele.reply}</h6></li>
    
                      <ul className = "icons">
                        <li className = "flex justifyContent fa-solid fa-thumbs-up button" onClick = {(e)=>handleReplyLike(e,ele._id,comment._id)}><span>{ele.likes}</span></li>
                        <li className = "flex justifyContent fa-solid fa-trash button" onClick = {(e)=>handleReplyDelete(e,ele._id,comment._id)}></li>
                      </ul>
                </ul>
              </ul>
            )
            }else{
              return comment.replies.map(ele=>
                <ul key = {ele._id}  className = {`reply comments flex ${
                  show[comment._id] ? "show" : "hidden"
                }`}>
                  <ul className = "info">
                        <li className = "user">{ele.displayName}  {ele.email}</li>
                        <li><h6 className = "text">{ele.reply}</h6></li>

                        <ul className = "icons">
                          <li className = "flex justifyContent fa-solid fa-thumbs-up button" onClick = {()=>toast.error("Login to Like Replies")}><span>{ele.likes}</span></li>
                        </ul>
                  </ul>
                </ul>
              )
            }
          };

          const arr = [];

            postComments.forEach((ele,i)=>{
              arr.push(
                <section key = {i} className = "comments flex">
                <ul className = "info">
                  <li className = "user">{ele.displayName}  {ele.email}</li>
                  <li><h6 className = "text">{ele.comment}</h6></li>

                  <ul className = "icons">
                      {localStorage.getItem("id") ?
                    <li className = "flex justifyContent fa-solid fa-thumbs-up button" onClick = {(e)=>handleLike(e,ele._id)}><span>{ele.likes}</span></li>
                    :
                    <li className = "flex justifyContent fa-solid fa-thumbs-up button" onClick = {()=>toast.error("Login to Like Comments")}><span>{ele.likes}</span></li>
                  }

                      {localStorage.getItem("id") ?
                    <li 
                    className = "flex justifyContent fa-solid fa-comment button" 
                    onClick = {()=>{setShowReply(true)
                    localStorage.setItem("commentId", ele._id)
                    }}>
                      <span>{ele.replies.length}</span>
                    </li>
                     :
                     <li 
                    className = "flex justifyContent fa-solid fa-comment button" 
                    onClick = {()=>toast.error("Login to Add Reply")}>
                      <span>{ele.replies.length}</span>
                    </li>
                     }

                    {localStorage.getItem("id") ?
                    <li className = "flex justifyContent fa-solid fa-trash button" onClick = {(e)=>handleDelete(e,ele._id)}></li>
                    : ""}
                  </ul>

                  <section className = {`flex alignItems justifyContent column`}>
                    {show[ele._id] ?
                    <button 
                    className = "button fa-solid fa-angle-up"
                    onClick ={(e)=>{e.preventDefault()
                      toggleCommentReplies(ele._id)}}
                    ><span>Replies ({ele.replies.length})</span></button>
                    :
                    <button 
                    className = "button fa-solid fa-angle-down" 
                    onClick ={(e)=>{e.preventDefault()
                      toggleCommentReplies(ele._id)}}
                    ><span>Replies ({ele.replies.length})</span></button>
                    }
                    {renderReplies(ele)}
                  </section>
              </ul>
           
                </section>
              );
            });

          setShowComments(arr);
        }
      },[postComments, setShowComments, setShowReply, addHidden, show]);

      return showComments

}

export default RenderComments