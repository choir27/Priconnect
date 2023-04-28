import {Link} from "react-router-dom"
import {useCallback, useEffect, useState, useMemo} from "react"
import {toast} from "react-toastify"
import axios from "axios"
import {trim, handleDelete, handleLike} from "../hooks/Post"

const RenderDashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const fetchData = useCallback(async()=>{
        try{
        const {data: postData} = await axios.get("http://localhost:8000/api/posts");
        setPosts(postData);
        }catch(err){
        console.error(err);
        }
    },[]);

    useEffect(()=>{
        if(!posts.length){
            setLoading(false);
        }
    },[posts.length])

    useMemo(()=>fetchData(),[fetchData]);

    useEffect(()=>{
    const array = [];
    
    posts.forEach(post=>{
    try{

        //render posts that the current user posted
    if(post.user === localStorage.getItem("id")){
        array.push(
        <section key = {post._id} className = "post flex">
            <div className = "image">
                <Link to = "/viewPost">
                    <img src = {post.post} alt = {`Post of ${post.title}`} onClick = {()=>localStorage.setItem("postId",post._id)}/>
                </Link>
            </div>
            <section className = "rightAlign">
                <h2>{post.title}</h2><h4>By {post.displayName}</h4>

                <div className = "icons flex">
                    <section className = "button" onClick = {(e)=>{
                        e.preventDefault();
                        toast.error("Cannot Like Own Post")
                    }}>
                        <i className = "fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
                    </section>
                    <Link to = "/comments" className = "button" onClick = {()=>localStorage.setItem("postId",post._id)}>
                        <i className = "fa-solid fa-comment">
                            <span>{post.comments.length}</span>
                        </i>
                    </Link>
                    <button className = "fa-solid fa-trash button"
                    onClick = {(e)=>handleDelete(e,post._id)}>
                    </button>
                    <Link to = "/editPost" className = "fa-solid fa-pen-to-square button" onClick = {()=>localStorage.setItem("postId", post._id)}></Link>    
                </div>

                <p>{trim(post.description)}</p>

                <Link to = "/viewPost"
                className = "button"
                onClick = {()=>localStorage.setItem("postId",post._id)}
                >
                    View post
                </Link>
            </section>
        </section>
        )
        //render posts that other users posted that are public
    }else if(post.status === "public"){
        array.push(
            <section key = {post._id} className = "post flex">
                <div className = "image">
                    <Link to = "/viewPost">
                        <img src = {post.post} alt = {`Post of ${post.title}`} onClick = {()=>localStorage.setItem("postId",post._id)}/>
                    </Link>
                </div>
                <section className = "rightAlign">
                    <h2>{post.title}</h2><h4>By {post.displayName}</h4>
    
                    <div className = "icons flex">
                        <section className = "button" onClick = {(e)=>handleLike(e,post._id)}>
                            <i className = "fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
                        </section>
                        <Link to = "/comments" className = "button" onClick = {()=>localStorage.setItem("postId",post._id)}>
                            <i className = "fa-solid fa-comment">
                                <span>{post.comments.length}</span>
                            </i>
                        </Link>
                    </div>
    
                    <p>{trim(post.description)}</p>
    
                    <Link to = "/viewPost"
                    className = "button"
                    onClick = {()=>localStorage.setItem("postId",post._id)}
                    >
                        View post
                    </Link>
                </section>
            </section>
            )
    };

    setLoading(false);
    
    }catch(err){
        console.error(err);
    }
    })
    
    setDashboard(array);
    }, [posts])

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return dashboard;
}

export default RenderDashboard