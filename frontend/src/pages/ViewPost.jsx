import axios from "axios"
import HeaderAuth from "../components/HeaderAuth"
import HeaderGuest from "../components/HeaderGuest"
import {useMemo, useCallback, useState} from "react"
import moment from "moment"
import {handleLike, handleComment} from "../hooks/Post"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const ViewPost = () => {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        const [postsResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/posts"),
        ]);
        setListOfPosts(postsResponse.data);
      },[setListOfPosts]);
    
    useMemo(()=>fetchData(),[fetchData]);

    useMemo(()=>{
        if(listOfPosts){
            setPost(listOfPosts.find(post=>post._id===localStorage.getItem("postId")));
        }
    },[listOfPosts]);

    useMemo(()=>{
        if(post){
            if(post.comments){
                if(post.comments[0]){
            setComments(post.comments.map((ele,i)=><tr key = {i}>
                <td>{ele.comment}</td>
                <td>{ele.displayName}</td>
                <td>{ele.email}</td>
                </tr>));
                }else{
            setComments(
                <tr>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>
            )
            }
        }
    }
    },[post]);

    return (
        <>
        {post && listOfPosts ? 
        <main className = "flex justifyContent column" id = "viewPost">
            {localStorage.getItem("id") ? <HeaderAuth className = {"pages"}/> : <HeaderGuest className = {"pages"}/>}
            <section className = "column alignItems flex">
                <h1>{post.title}</h1>

                <section className = "flex info">
                <section className = "flex column">
                    <h3>Posted By {post.displayName}</h3>
                    <span>Posted At {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
                </section>

                <section className = "flex justifyContent" id = "icons">
                    {localStorage.getItem("id") ?
                    <section className = "button" onClick = {(e)=>handleLike(e,post._id)}>
                        <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
                    </section>
                    :
                    <section className = "button" onClick = {()=>toast.error("Login to Like posts")}>
                        <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
                    </section>
                    }

                    <section className = "button" onClick = {(e)=>handleComment(e,post._id,navigate)}>
                        <i className="fa-solid fa-comment"><span>{post.comments ? post.comments.length : ""}</span></i>
                    </section >
                </section>

                </section>
                
                <div className = "image">
                    <img src = {post.post} alt = {`Post Of ${post.title}`}/>
                </div>
            
                <div className = "description">
                    <p>{post.description}</p>
                </div>
            
                <div id = "comments" className = "flex justifyContent">
                    <table className = "comments">
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th>Comment By</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments}
                    </tbody>
                    </table>
                </div>

            </section>
        </main>
        :  <main className = "flex column justifyContent" id = "comments">
        {localStorage.getItem("id") ? <HeaderAuth className = {"pages"}/> : <HeaderGuest className = {"pages"}/>}
        <h1>Loading...</h1>
      </main>}
        </>
    )
}

export default ViewPost