import {useCallback, useState, useEffect, useMemo} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import HeaderGuest from "../components/HeaderGuest"
import {toast} from "react-toastify"

const DashboardGuest = () => {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const [postsResponse, usersResponse] = await Promise.all([
      axios.get("http://localhost:8000/api/posts"),
      axios.get("http://localhost:8000/api/users"),
    ]);
    setPosts(postsResponse.data);
    setUsers(usersResponse.data);
  },[setPosts, setUsers]);


  useEffect(()=>{fetchData()},[fetchData]);

  const trim = (string) => {
    if(string.length > 150){
      return string.substring(0,152) + "..."
    }else{
      return string
    }
  }

  const viewPost = useCallback((id) => {
    localStorage.setItem("postId", id);
    navigate("/viewPost");
  },[navigate]);

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
          <div className="image">
            <img src={post.post} alt={`Post of ${post.title}`} onClick={() => viewPost(post._id)} />
          </div>
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

  },[posts, users, viewPost]);

  useMemo(()=>{setListOfPosts(renderPosts())}, [renderPosts]);

  return (
    <main className = "flex column justifyContent" id = "show">
    <HeaderGuest className = {"pages"}/>
    <h1 className = "justifyContent flex">Dashboard</h1>
    <h2 className = "justifyContent flex">Click the post to view it!</h2>
    <section className = "posts flex alignItems column">

      {listOfPosts}
    </section>
    </main>
  )
}

export default DashboardGuest