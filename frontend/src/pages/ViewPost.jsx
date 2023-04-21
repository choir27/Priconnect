import axios from "axios"
import HeaderAuth from "../components/HeaderAuth"
import {useMemo, useCallback, useState} from "react"
import moment from "moment"

const ViewPost = () => {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [post, setPost] = useState({});

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

    return (
        <>
        {post && listOfPosts ? 
        <main className = "flex justifyContent column alignItems">
            <HeaderAuth className = {"pages"}/>
            <section className = "post column alignItems flex" id = "post">
            <h1>{post.title}</h1>
            <h3>Posted By {post.displayName}</h3>
            <span>Posted At {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <div className = "flex justifyContent" id = "icons">
            <section>
            <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
            </section>
            <section>
            <i className="fa-solid fa-comment"><span>{post.comments ? post.comments.length : ""}</span></i>
            </section>
            </div>
            <img src = {post.post} alt = {`Post Of ${post.title}`}/>
            </section>
        </main>
        : ""}
        </>
    )
}

export default ViewPost