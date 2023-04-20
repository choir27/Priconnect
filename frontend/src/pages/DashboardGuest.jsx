import {useCallback, useState, useEffect, useMemo} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import HeaderGuest from "../components/HeaderGuest"

const DashboardGuest = () => {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [table, setTable] = useState([]);

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
      if(usersName){
        listOfPosts.push(
          <section key = {post._id} className="column alignItems flex post">
            <h2>{post.title}</h2><h4>By: {usersName.displayName}</h4>
              <section className = "flex icons justifyContent">
              <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
              <i className="fa-solid fa-comment"><span>{post.comments.length}</span></i>
              </section>

              <a href = "/" onClick = {(e)=>{
                e.preventDefault();
                viewPost(post._id)}}>See Post</a>
            <img src = {post.post} alt = {`Post Of ${post.title}`} onClick = {()=>viewPost(post._id)}/>
       
          </section>
        );
      };
    });

    return listOfPosts;
  }
  },[posts, users, viewPost]);

  useMemo(()=>{setTable(renderPosts())}, [renderPosts]);

  return (
    <main className = "flex column justifyContent">
    <h1 className = "justifyContent flex">Dashboard</h1>
    <HeaderGuest className = {"pages"}/>
    <section className = "flex index" id = "show">
      {table}
    </section>
    </main>
  )
}

export default DashboardGuest