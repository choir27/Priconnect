import {useCallback, useState, useEffect, useMemo} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import HeaderGuest from "../components/HeaderGuest"

const DashboardGuest = () => {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async()=>{
    try{
      const {data: postData} = await axios.get("http://localhost:8000/api/posts");
      const {data: userData} = await axios.get("http://localhost:8000/api/users");
      setPosts(postData);
      setUsers(userData);
    }catch(err){
      console.error(err);
    }
  },[]);

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
    if(posts.length && users.length){

    const userMap = new Map();
    for(const account of users){
      userMap.set(account._id, account);
    };

    const listOfPosts = [];
    posts.forEach(post=>{
      const usersName = userMap.get(post.user);
      if(usersName && post.status === "public"){
        listOfPosts.push(
            <section key = {post._id} className="post flex">
  
            <div className = "image">
            <img src = {post.post} alt = {`Post of ${post.title}`}  onClick = {()=>viewPost(post._id)}/>
  
            </div>
              
              <section className = "rightAlign">
              <h2>{post.title}</h2><h4>By: {usersName.displayName}</h4>
              <div className = "icons flex">
                <section>
                <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
                </section>
                <section>
                <i className="fa-solid fa-comment"><span>{post.comments.length}</span></i>
                </section>
  
              </div>
  
  
              <div className = "flex buttons">
                  <p>{trim(post.description)}</p>
              </div>
  
              <Link to = "/" 
              className = "button"
              onClick = {(e)=>{e.preventDefault()
              viewPost();
              }}>View Post</Link>
              </section>
            </section>
        );
      };
    });

    return listOfPosts;
  }
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