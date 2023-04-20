import {useCallback, useState, useEffect, useMemo} from "react"
import {useNavigate} from "react-router-dom"
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
          <section key = {post._id} className="column alignItems flex post" onClick = {()=>viewPost(post._id)}>
            <h2>{post.title}</h2><h4>By: {usersName.displayName}</h4>
       
            <div className = "icons flex">
              <section>
              <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
              </section>
              <section>
              <i className="fa-solid fa-comment"><span>{post.comments.length}</span></i>
              </section>
            </div>

            <img src = {post.post} alt = {`Post of ${post.title}`}/>

            <div className = "flex buttons">
              {post.user === localStorage.getItem("id") ?
                <button className = "fa-solid fa-trash button"
                onClick = {(e)=>{
                e.preventDefault();
                handleDelete(post._id)}}></button>: "" }

              {post.user === localStorage.getItem("id") ?
            <button className = "fa-solid fa-pen-to-square button" 
            onClick = {()=>handleEdit(post._id)}></button> : "" }
            </div>
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
    <h2 className = "justifyContent flex">Click the post to view it!</h2>
    <section className = "posts flex">
      {table}
    </section>
    </main>
  )
}

export default DashboardAuth