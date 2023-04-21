import {useCallback, useState, useEffect, useMemo} from "react"
import {useNavigate, Link} from "react-router-dom"
import axios from "axios"
import HeaderAuth from "../components/HeaderAuth"

const DashboardAuth = () => {

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

  const handleEdit = useCallback(async(id)=>{
    localStorage.setItem("postId", id);
    navigate("/editPost");
  },[navigate]);

  const handleDelete = useCallback(async(id)=>{
    try{
      axios.delete(`http://localhost:8000/deletePost/${id}`)
        .then(res=>{
          console.log(res);
          window.location.reload();
        })
    }catch(err){
      console.error(err);
    }
  },[]);

  useEffect(()=>{fetchData()},[fetchData]);

  const viewPost = useCallback((id) => {
    localStorage.setItem("postId", id);
    navigate("/viewPost");
  },[navigate]);

  const trim = (string) => {
    if(string.length > 150){
      return string.substring(0,152) + "..."
    }else{
      return string
    }
  }

  const renderPosts = useCallback(()=>{
    if(posts.length && users.length){

    const userMap = new Map();
    for(const account of users){
      userMap.set(account.googleId, account);
    };
    

    const listOfPosts = [];
    posts.forEach(post=>{
      const usersName = userMap.get(post.user);
        if(usersName && localStorage.getItem("id") === post.user){
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

                <button className = "fa-solid fa-trash button"
                onClick = {(e)=>{
                e.preventDefault();
                handleDelete(post._id)}}></button>

            <button className = "fa-solid fa-pen-to-square button" 
            onClick = {()=>handleEdit(post._id)}></button>
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
      }else if(post.status === "public"){
        listOfPosts.push(
          <section key = {post._id} className="post flex">

          <div className = "image">
          <img src = {post.post} alt = {`Post of ${post.title}`}  onClick = {()=>viewPost(post._id)}/>

          </div>
            
            <section className = "rightAlign">
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
  },[posts, users, handleEdit, handleDelete, viewPost]);

  useMemo(()=>{setTable(renderPosts())}, [renderPosts]);

  return (
    <main className = "flex column justifyContent" id = "show">
    <HeaderAuth className = {"pages"}/>
    <h1 className = "justifyContent flex">Dashboard</h1>
    <h2 className = "justifyContent flex">Click the image/link to view the post!</h2>
    <section className = "posts flex alignItems column">
      {table}
    </section>
    </main>
  )
}

export default DashboardAuth