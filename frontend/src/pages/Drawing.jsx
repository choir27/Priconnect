import axios from "axios"
import {useMemo, useCallback, useState} from "react"
import moment from "moment"
import Header from "../components/Header"
import HeaderAuth from "../components/HeaderAuth"

const Drawing = () => {

    const [users, setUsers] = useState([]);
    const [listOfPosts, setListOfPosts] = useState([]);
    const [post, setPost] = useState({});
    const [userOfPost, setUserOfPost] = useState({});

    const fetchData = useCallback(async() => {
        const {data: postData} = await axios.get("http://localhost:3000/api/posts");
        const {data: userData} = await axios.get("http://localhost:3000/api/users");
        setUsers(userData);
        setListOfPosts(postData);
    },[]);

    useMemo(()=>fetchData(),[fetchData]);

    useMemo(()=>{
        if(listOfPosts){
            setPost(listOfPosts.find(drawing=>drawing._id===localStorage.getItem("postId")));
        }
    },[listOfPosts]);

    useMemo(()=>{
        if(users && post){
        setUserOfPost(users.find(account=>account._id === post.user));
        };
    },[users, post]);
    
    return (
        <>
        {post && users && listOfPosts && userOfPost ? 
        <main className = "flex justifyContent column alignItems">
            {localStorage.getItem("id") ? <HeaderAuth/> : <Header/>}
            <section className = "post column alignItems flex" id = "post">
            <h1>{post.title}</h1>
            <h3>Posted By {userOfPost.displayName}</h3>
            <span>Posted At {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            <div className = "flex justifyContent" id = "icons">
            <section>
            <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
            </section>
            <section>
            <i className="fa-solid fa-comment"><span>{post.comments ? post.comments.length : ""}</span></i>
            </section>
            </div>
            <img src = {post.post} alt = {`Drawing of ${post.title}`}/>
            </section>
        </main>
        : ""}
        </>
    )
}

export default Drawing