import HeaderAuth from "../components/HeaderAuth"
import HeaderGuest from "../components/HeaderGuest"
import axios from "axios"
import {useState, useEffect, useMemo, useCallback} from "react"
import {Link} from "react-router-dom"
import {handleDelete, handleComment} from "../hooks/Comments"
import {toast} from "react-toastify"

const Comments = () => {

    const [postComments, setPostComments] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [comments, setComments] = useState("");
    const [user, setUser] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [showReply, setShowReply] = useState(false);
    const [addHidden, setAddHidden] = useState("");
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
      try{
        const [usersResponse, commentResponse, postResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/users"),
          axios.get("http://localhost:8000/api/comments"),
          axios.get("http://localhost:8000/api/posts")
        ]);
        setPosts(postResponse.data);
        setCommentList(commentResponse.data);
        setUser(usersResponse.data);
      }catch(err){
        console.error(err);
      }
    };
    
    useMemo(()=>{
        fetchData();
    },[]);

    const findComments = useCallback(()=>{
      if(commentList){
        const array = [];
      const findComment = commentList.map(comment=>({[comment["postId"]] : comment}))
      findComment.forEach(ele=>{
        if(ele[localStorage.getItem("postId")]){
          array.push(ele[localStorage.getItem("postId")])
        }
      })

      setPostComments(array);
      }
    },[commentList]);

    useMemo(()=>setCommentList(findComments()),[findComments]);

    useEffect(()=>setCurrentPost(posts.find(ele=>ele._id === localStorage.getItem("postId"))),[posts]);

    useEffect(()=>{
    if(showReply){
      setAddHidden("show");
    }else{
      setAddHidden("hidden");
    }
  },[showReply]);

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
            <li className = "flex justifyContent fa-solid fa-comment button" onClick = {()=>setShowReply(true)}><span>{ele.replies.length}</span></li>
            <li className = "flex justifyContent fa-solid fa-trash button" onClick = {(e)=>handleDelete(e,ele._id)}></li>
            </ul>
            </ul>
         
            </section>
                )
            })
            setShowComments(arr)
      }
    },[postComments, handleDelete])
  
    const handleHideResponse = useCallback(async(e)=>{
      e.preventDefault();
      setShowReply(false);
    },[setShowReply]);

    const [responseDisplay, setResponseDisplay] = useState([]);

    useEffect(()=>{
      setResponseDisplay(    
      <section id = "reply" className = {`flex ${addHidden}`}>
              <small className = "flex" onClick = {(e)=>{handleHideResponse(e)}}><i className = "fa-solid fa-xmark"></i></small>
      <form className = "flex column">
        <textarea onChange = {(e)=>setShowReply(e.target.value)}/>
        <button className = "button">Add Response</button>
      </form>
    </section>
    )
    },[addHidden, setShowReply ,handleHideResponse])

  return (
    <div className = "flex justifyContent">
                  {responseDisplay}
    {currentPost?
  <main className = "flex column justifyContent" id = "comments">
        {localStorage.getItem("id") ? <HeaderAuth className = {"pages"}/> : <HeaderGuest className = {"pages"}/>}
        <h1>Comments for {currentPost ? currentPost.title : ""}</h1>

        <section className = "flex viewPost">
          <div className = "flex column alignItems">
          <Link to = "/viewPost" className = "button">View post</Link>

          <i className="fa-solid fa-comment">
                <span>{currentPost.comments ? currentPost.comments.length : "Error"}</span>
          </i>
          </div>

          {localStorage.getItem("id")?
      <form onSubmit = {(e)=>handleComment(e,user,comments)}>
            <textarea type = "text" spellCheck = {true} name = "comments" onChange = {(e)=>setComments(e.target.value)}/>        
            <input type = "submit" className = "button"/>        
      </form>
     : 
     <form>
     <textarea disabled type = "text" spellCheck = {true} name = "comments" onChange = {(e)=>setComments(e.target.value)}/>        
     <input onClick = {toast.error("Login to comment on posts")} disabled type = "submit" className = "button"/>        
</form>
     }
      </section>

      <section className = "flex column alignItems showComments">

        {showComments}
      </section>
  </main>
    : ""}
  </div>
  )
    
}

export default Comments