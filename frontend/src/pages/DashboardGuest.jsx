import {useCallback, useState, useEffect} from "react"
import axios from "axios"
import HeaderGuest from "../components/HeaderGuest"
import RenderDashboardGuest from "../components/RenderDashboardGuest"

const DashboardGuest = () => {

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


  useEffect(()=>{fetchData()},[fetchData]);

 
  return (
    <main className = "flex column justifyContent" id = "show">
    <HeaderGuest className = {"pages"}/>
    <h1 className = "justifyContent flex">Dashboard</h1>
    <h2 className = "justifyContent flex">Click the post to view it!</h2>
    <section className = "posts flex alignItems column">

      <RenderDashboardGuest posts = {posts} users = {users}/>
    </section>
    </main>
  )
}

export default DashboardGuest