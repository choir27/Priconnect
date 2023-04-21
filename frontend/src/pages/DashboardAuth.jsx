import HeaderAuth from "../components/HeaderAuth";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const renderPosts = (posts, users, viewPost, updatePostLikes) => {

  const handleDelete = async(e,id)=>{
    try{
      e.preventDefault();
      axios.delete(`http://localhost:8000/deletePost/${id}`)
        .then(res=>{
          console.log(res);
          window.location.reload();
        })
    }catch(err){
      console.error(err);
    }
  };


  const userMap = new Map();
  for (const user of users) {
    userMap.set(user.googleId, user);
  }

  return posts.map((post) => {
    const user = userMap.get(post.user);
    const isCurrentUserPost = localStorage.getItem("id") === post.user;
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
            <button className="button" onClick={(e) => handleLike(e, post, updatePostLikes)}>
              <i className="fa-solid fa-thumbs-up">
                <span>{post.likes}</span>
              </i>
            </button>
            <Link to = "/comments" className="button" onClick = {()=>localStorage.setItem("postId",post._id)}>
              <i className="fa-solid fa-comment">
                <span>{post.comments.length}</span>
              </i>
            </Link>
            {isCurrentUserPost && (
              <>
                <button className="fa-solid fa-trash button" onClick={(e) => handleDelete(e, post._id)}></button>
                <Link to = "/editPost" className="fa-solid fa-pen-to-square button" onClick={() => localStorage.setItem("postId", post._id)}></Link>
              </>
            )}
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
};

const handleLike = async (event, post, updatePostLikes) => {
  event.preventDefault();
  const postId = post._id;
  const newLikesCount = post.likes + 1;

  try {
    const response = await axios.put(`http://localhost:8000/addLike/${postId}`, {
      likes: newLikesCount,
    });
    const updatedPost = response.data;
    updatePostLikes(updatedPost);
  } catch (error) {
    console.error(error);
  }
};



const trim = (description) => {
  const maxLength = 100;
  return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
};

const DashboardAuth = ({viewPost }) => {
  const [postLikes, setPostLikes] = useState({});
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(async () => {
    const [postsResponse, usersResponse] = await Promise.all([
      axios.get("http://localhost:8000/api/posts"),
      axios.get("http://localhost:8000/api/users"),
    ]);
    setPosts(postsResponse.data);
    setUsers(usersResponse.data);
  },[setPosts, setUsers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  useEffect(()=>{
  const likesMap = new Map();
  for (const post of posts) {
  likesMap.set(post._id, post.likes);
  }
  setPostLikes(likesMap);
  }, [posts]);

  
  const updatePostLikes = (updatedPost) => {
  const newPostLikes = new Map(postLikes);
  newPostLikes.set(updatedPost._id, updatedPost.likes);
  setPostLikes(newPostLikes);
  };
  
  const sortedPosts = useMemo(() => {
  return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [posts]);
  
  return (
  <main className = "flex column justifyContent" id = "show">
  <HeaderAuth className = {"pages"}/>
  <h1 className = "justifyContent flex">Dashboard</h1>
  <h2 className = "justifyContent flex">Click the image/link to view the post!</h2>
  <section className = "posts flex alignItems column">

  {renderPosts(sortedPosts, users, viewPost, updatePostLikes)}
  </section>

  </main>
  );
  };
  
  export default DashboardAuth;