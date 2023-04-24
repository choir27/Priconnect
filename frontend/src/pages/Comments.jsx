import HeaderAuth from "../components/HeaderAuth"
import HeaderGuest from "../components/HeaderGuest"
import axios from "axios"
import {useState, useEffect, useMemo, useCallback} from "react"
import {Link} from "react-router-dom"

const Comments = () => {

    const [postComments, setPostComments] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [comments, setComments] = useState("");
    const [user, setUser] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [showComments, setShowComments] = useState([]);

    const fetchData = useCallback(async () => {
        const [usersResponse, commentResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/users"),
          axios.get("http://localhost:8000/api/comments"),
        ]);
        setCommentList(commentResponse.data);
        setUser(usersResponse.data);
    },[setUser, setCommentList]);
    
    useEffect(()=>{
        fetchData();
    },[fetchData]);

    const handleComment = useCallback(async(e) => {
      e.preventDefault();

        const currentUser = user.find(ele=>ele.googleId === localStorage.getItem("id"))
        
        const response = await axios.put(`http://localhost:8000/addComment/${localStorage.getItem("postId")}`, {
          user: localStorage.getItem("id"),
          email: currentUser.email, 
          displayName: currentUser.displayName,
          comments: comments,
        });
        const updatedComments = response.data;

        console.log(updatedComments);

        window.location.reload();
    },[comments, user])

    const findPost = useCallback(()=>{
      if(commentList){
            if(commentList.length){
              const findComment = commentList.map(comment=>({[comment["postId"]] : comment}))
                .map(ele=>ele[localStorage.getItem("postId")]);
              setPostComments(findComment);
            };
        }
    },[commentList]);

    const handleDelete = useCallback(async(e, id)=>{
      e.preventDefault();
      const response = await axios.delete(`http://localhost:8000/deleteComment/${id}`)
      
      const deleteComments = response.data;

      console.log(deleteComments);

      window.location.reload();
    },[])

    useMemo(()=>setCurrentPost(findPost()),[findPost]);


    useEffect(()=>{
      if(postComments){
        if(postComments.length){
          setShowComments(
            postComments.map((ele,i)=>
            <section key = {i} className = "comments flex">
              <ul className = "info">
            <li className = "user">{ele.displayName}  {ele.email}</li>
            <li><h6 className = "text">{ele.comments}</h6></li>
            <ul className = "icons">
            <li className = "flex justifyContent fa-solid fa-thumbs-up button"><span>{ele.likes}</span></li>
            <li className = "flex justifyContent fa-solid fa-comment button"><span>{ele.replies.length}</span></li>
            <li className = "flex justifyContent fa-solid fa-trash button" onClick = {(e)=>handleDelete(e, ele._id)}></li>
            </ul>
            </ul>
         
            </section>))
        }
      }
    },[currentPost, postComments, handleDelete])
    
    
  
  return (
    <main className = "flex column justifyContent" id = "comments">
          {localStorage.getItem("id") ? <HeaderAuth className = {"pages"}/> : <HeaderGuest className = {"pages"}/>}

          <h1>Comments for {currentPost ? currentPost.title : ""}</h1>

          <section className = "flex viewPost">
            <div className = "flex column alignItems">
            <Link to = "/viewPost" className = "button">View post</Link>

            <i className="fa-solid fa-comment">
                  {currentPost && currentPost.comments ?
                  <span>{typeof currentPost.comments.length === "number" ? currentPost.comments.length : "Error"}</span>
                    : ""} </i>
            </div>

            {localStorage.getItem("id") ?
        <form onSubmit = {handleComment}>
              <textarea type = "text" spellCheck = {true} name = "comments" onChange = {(e)=>setComments(e.target.value)}/>        
              <input type = "submit" className = "button"/>        
        </form>
       : 
       <form onSubmit = {handleComment}>
       <textarea disabled type = "text" spellCheck = {true} name = "comments" onChange = {(e)=>setComments(e.target.value)}/>        
       <input disabled type = "submit" className = "button"/>        
 </form>
       }
        </section>
        
        <section className = "flex column alignItems">
          {showComments}
        </section>
    </main>
    )
}

export default Comments