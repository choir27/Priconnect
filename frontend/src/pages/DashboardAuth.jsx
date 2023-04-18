import HeaderAuth from "../components/HeaderAuth"
import {useCallback, useState, useEffect, useMemo} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

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

  useEffect(()=>{fetchData()},[fetchData]);

  const renderPosts = useCallback(()=>{
    if(posts.length && users.length){

    const userMap = new Map();
    for(const account of users){
      userMap.set(account._id, account);
    };

    const listOfPosts = [];
    posts.forEach(drawing=>{
      const usersName = userMap.get(drawing.user);
      if(usersName){
        listOfPosts.push(
          <section key = {drawing._id} className="post column alignItems flex">
            <h2>{drawing.title}</h2><h4>By: {usersName.displayName}</h4>

            <div className = "flex">
              <section>
              <i className="fa-solid fa-thumbs-up"><span>{drawing.likes}</span></i>
              </section>
              <section>
              <i className="fa-solid fa-comment"><span>{drawing.comments.length}</span></i>
              </section>
            </div>

            <div className = "flex justifyContent icons">
              {drawing.user === localStorage.getItem("id") ?
            <i className = "fa-solid fa-trash"></i> : "" }
              {drawing.user === localStorage.getItem("id") ?
            <button className = "fa-solid fa-pen-to-square" onClick = {()=>handleEdit(drawing._id)}></button> : "" }
            </div>

            <img src = {drawing.post} alt = {`Drawing of ${drawing.title}`}/>
       
          </section>
        )
      }
    });

    return listOfPosts;
  }
  },[posts, users, handleEdit]);

  useMemo(()=>{setTable(renderPosts())}, [renderPosts]);

  return (
    <main>
    <HeaderAuth/>
    <h1>Dashboard</h1>
    <section id = "table" className = "flex">
      {table}
    </section>
    </main>
  )
}

export default DashboardAuth