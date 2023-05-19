import HeaderAuth from "../components/HeaderAuth"
import HeaderGuest from "../components/HeaderGuest"
import axios from "axios"
import {useState, useEffect, useMemo} from "react"
import {Link} from "react-router-dom"
import {handleComment} from "../hooks/Comments"
import {toast} from "react-toastify"
import RenderComments from "../components/RenderComments"
import RenderReplyContainer from "../components/RenderReplyContainer"

const Comments = () => {

    const [currentPost, setCurrentPost] = useState({});
    const [comments, setComments] = useState("");
    const [user, setUser] = useState({});
    const [showComments, setShowComments] = useState([]);
    const [showReply, setShowReply] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
      try{
        const [usersResponse, postResponse] = await Promise.all([
          axios.get("https://priconne-backend-production.up.railway.app/api/users"),
          axios.get("https://priconne-backend-production.up.railway.app/api/posts")
        ]);
        setPosts(postResponse.data);
        setUser(usersResponse.data);
      }catch(err){
        console.error(err);
      }
    };
    
    useMemo(()=>{
        fetchData();
    },[]);


    useEffect(()=>setCurrentPost(posts.find(ele=>ele._id === localStorage.getItem("postId"))),[posts]);

  return (
    <div className = "flex justifyContent">
      <RenderReplyContainer user = {user} setShowReply = {setShowReply} showReply = {showReply}/>
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
            <textarea disabled type = "text"/>        
            <button onClick = {(e)=>{
              e.preventDefault();
              toast.error("Login to comment on posts")}} className = "button">Submit</button>      
          </form>
          }
          </section >
          
          <section className = "flex column alignItems showComments">
            <RenderComments setShowComments = {setShowComments} setShowReply = {setShowReply} showComments = {showComments}/>
          </section>
        </main>
      :  
      
      <main className = "flex column justifyContent" id = "comments">
      {localStorage.getItem("id") ? <HeaderAuth className = {"pages"}/> : <HeaderGuest className = {"pages"}/>}
      <h1>Loading...</h1>
    </main>}
  </div>
  )
    
}

export default Comments