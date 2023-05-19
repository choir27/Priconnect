import {Link} from "react-router-dom"
import React, {useCallback, useState, useMemo} from "react"
import {toast} from "react-toastify"
import axios from "axios"
import {trim, handleDelete, handleLike} from "../hooks/Post"

const RenderDashboard = React.memo(() => {
    const [dashboard, setDashboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const fetchData = useCallback(async()=>{
        try{
        const [postResponse] = await Promise.all([
            axios.get("https://priconne-backend-production.up.railway.app/api/posts")
        ])

        console.log(postResponse.data);
        setPosts(postResponse.data);
        setLoading(false);
        }catch(err){
        console.error(err);
        }
    },[]);
    

    const handleDeleteCallback = useCallback((e,postId)=>{
        handleDelete(e, postId);
    }, []);

    const handleLikeCallback = useCallback((e,postId)=>{
        handleLike(e,postId);
    }, []);

    useMemo(()=>fetchData(),[fetchData]);

    useMemo(()=>{
        try{

            const array = [];

            posts.forEach(post=>{
                 //render posts that the current user posted
                 if(post.user === localStorage.getItem("id")){
                     array.push(
                     <section key = {post._id} className = "post flex">
                         <Link to = "/viewPost" className = "image flex alignItems justifyContent">
                             <img src = {post.post} alt = {`Post of ${post.title}`} onClick = {()=>localStorage.setItem("postId",post._id)}/>
                         </Link>
                         <section className = "rightAlign">
                             <h2>{post.title}</h2><h4>By {post.displayName}</h4>
                        
                             <div className = "icons flex">
                                 <div className = "icons-row1">
                                     <button className = "fa-solid fa-trash button"
                                     onClick = {(e)=>handleDeleteCallback(e,post._id)}>
                                     </button>
                                     <Link to = "/editPost" className = "fa-solid fa-pen-to-square button" onClick = {()=>localStorage.setItem("postId", post._id)}></Link>    
                        
                                 </div>
                                 <div className = "icons-row2">
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
                                 </div>
                                 <Link to = "/viewPost" className = "button" onClick = {()=>localStorage.setItem("postId",post._id)}>View</Link>
                                 
                                 
                             </div>
                                 
                             <div className = "flex buttons">
                                 <p>{trim(post.description)}</p>
                             </div>
                                 
                                 
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
                                     <section className = "button" onClick = {(e)=>handleLikeCallback(e,post._id)}>
                                         <i className = "fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
                                     </section>
                                     <Link to = "/comments" className = "button" onClick = {()=>localStorage.setItem("postId",post._id)}>
                                         <i className = "fa-solid fa-comment">
                                             <span>{post.comments.length}</span>
                                         </i>
                                     </Link>
                        
                                     <Link to = "/viewPost" className = "button" onClick = {()=>localStorage.setItem("postId",post._id)}>View</Link>
                                 </div>
                        
                                 <div className = "flex buttons">
                                     <p>{trim(post.description)}</p>
                                 </div>    
                             </section>
                         </section>
                         )
                 };
             
                 setLoading(false);

            })

            setDashboard(array);

        }catch(err){
            console.error(err);
        }

    }, [posts, handleDeleteCallback, handleLikeCallback])

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return dashboard;
})

export default RenderDashboard