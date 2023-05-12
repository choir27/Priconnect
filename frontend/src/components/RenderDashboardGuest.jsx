import {trim} from "../hooks/Post"
import {toast} from "react-toastify"
import axios from "axios"
import {Link} from "react-router-dom"
import {useCallback, useEffect, useState} from "react"

const RenderDashboardGuest = () => {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
  
    const fetchData = useCallback(async () => {
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get("https://priconne-backend.onrender.com/api/posts"),
        axios.get("https://priconne-backend.onrender.com/api/users"),
      ]);
      setPosts(postsResponse.data);
      setUsers(usersResponse.data);
    },[setPosts, setUsers]);
  
    useEffect(()=>{fetchData()},[fetchData]);

    const renderPosts = useCallback(()=>{
        const userMap = new Map();
        for (const user of users) {
          userMap.set(user.googleId, user);
        }
      
        return posts.map((post) => {
          const user = userMap.get(post.user);
          const isPostPublic = post.status === "public";
      
          return (
            <>
        { isPostPublic ?    
            <section key={post._id} className="post flex">
              <Link to = "/viewPost" className = "image flex justifyContent alignItems">
                <img src={post.post} alt={`Post of ${post.title}`} onClick={() => localStorage.setItem("postId", post._id)} />
              </Link>
              <section className="rightAlign">
                <h2>{post.title}</h2>
                {user && <h4>By: {user.displayName}</h4>}
                <div className="icons flex">
                  <button className="button" onClick = {()=>toast.error("Login to like posts")}>
                    <i className="fa-solid fa-thumbs-up">
                      <span>{post.likes}</span>
                    </i>
                  </button>
                  <Link to = "/comments" className="button" onClick = {()=>localStorage.setItem("postId",post._id)}>
                    <i className="fa-solid fa-comment">
                      <span>{post.comments.length}</span>
                    </i>
                  </Link>

                  <Link to="/viewPost" className="button" onClick={() =>localStorage.setItem("postId", post._id)}>
                    View
                  </Link>
             
                </div>
                <div className="flex buttons">
                  <p>{trim(post.description)}</p>
                </div>
         
              </section>
            </section>
        : ""}
        </>
          );
        });
    
      },[posts, users]);
    
      useEffect(() => {
        setListOfPosts(renderPosts());
      }, [renderPosts]);

      return listOfPosts
}

export default RenderDashboardGuest