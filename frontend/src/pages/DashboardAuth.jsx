import {useCallback, useState, useMemo} from "react"
import axios from "axios"
import HeaderAuth from "../components/HeaderAuth"
import {trim, handleDelete, handleLike} from "../hooks/PostDashboard"
import RenderDashboard from "../components/RenderDashboard"

const DashboardAuth = () => {

  const [posts, setPosts] = useState([]);

  const fetchData = useCallback(async()=>{
    try{
      const {data: postData} = await axios.get("http://localhost:8000/api/posts");
      setPosts(postData);
    }catch(err){
      console.error(err);
    }
  },[]);

  useMemo(()=>fetchData(),[fetchData]);
  
  return (
    <main className = "flex column justifyContent" id = "show">
    <HeaderAuth className = {"pages"}/>
    <h1 className = "justifyContent flex">Dashboard</h1>
    <h2 className = "justifyContent flex">Click the image/link to view the post!</h2>
    <section className = "posts flex alignItems column">
      <RenderDashboard trim = {trim} posts = {posts} handleLike = {handleLike} handleDelete = {handleDelete}/>
    </section>
    </main>
  )
}

export default DashboardAuth