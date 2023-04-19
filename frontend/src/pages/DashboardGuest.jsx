import Header from "../components/Header"
import {useCallback, useState, useEffect, useMemo} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

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

  const viewDrawing = useCallback((id) => {
    localStorage.setItem("postId", id);
    navigate("/drawing");
  },[navigate]);

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

            <img src = {drawing.post} alt = {`Drawing of ${drawing.title}`}  onClick = {()=>viewDrawing(drawing._id)}/>
       
          </section>
        );
      };
    });

    return listOfPosts;
  }
  },[posts, users, viewDrawing]);

  useMemo(()=>{setTable(renderPosts())}, [renderPosts]);

  return (
    <main>
    <Header/>
    <h1>Dashboard</h1>
    <section id = "table" className = "flex">
      {table}
    </section>
    </main>
  )
}

export default DashboardGuest