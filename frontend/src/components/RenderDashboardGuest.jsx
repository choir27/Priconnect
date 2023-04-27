import {trim} from "../hooks/PostDashboard"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"
import {useCallback, useState, useMemo} from "react"

const RenderDashboardGuest = ({users, posts}) => {
    const [listOfPosts, setListOfPosts] = useState([]);

    const renderPosts = useCallback(()=>{
        const userMap = new Map();
        for (const user of users) {
          userMap.set(user.googleId, user);
        }
      
        return posts.map((post) => {
          const user = userMap.get(post.user);
          const isPostPublic = post.status === "public";
      
          return (
            <section key={post._id} className="post flex">
              <Link to = "/viewPost">
              <div className="image">
                <img src={post.post} alt={`Post of ${post.title}`} onClick={() => localStorage.setItem("postId", post._id)} />
              </div>
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
             
                </div>
                <div className="flex buttons">
                  <p>{trim(post.description)}</p>
                </div>
                <Link to="/viewPost" className="button" onClick={() =>localStorage.setItem("postId", post._id)}>
                  View Post
                </Link>
              </section>
            </section>
          );
        });
    
      },[posts, users]);
    
      useMemo(()=>{setListOfPosts(renderPosts())}, [renderPosts]);
    
      return listOfPosts
}

export default RenderDashboardGuest