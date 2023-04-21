import HeaderAuth from "../components/HeaderAuth"
import HeaderGuest from "../components/HeaderGuest"
import axios from "axios"
import {useState, useEffect, useMemo, useCallback} from "react"
import {Link, useNavigate} from "react-router-dom"

const Comments = () => {

    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [comments, setComments] = useState("");

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        const [postsResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/posts"),
        ]);
        setPosts(postsResponse.data);
    },[setPosts]);
    
    useEffect(()=>{
        fetchData();
    },[fetchData]);

    const handleComment = async(e) => {
      e.preventDefault();

        const response = await axios.put(`http://localhost:8000/addComment/${localStorage.getItem("postId")}`, {
          comments: comments,
        });
        const updatedComments = response.data;

        console.log(updatedComments);

        window.location.reload();
    }

    const findPost = useCallback(()=>{
        if(posts){
            if(posts.length){
            return posts.find(post=>post._id === localStorage.getItem("postId"));
            };
        };
    },[posts]);

    useMemo(()=>setCurrentPost(findPost()),[findPost]);
  
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
        
        <section>
        </section>
    </main>
    )
}

export default Comments