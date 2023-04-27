import axios from "axios"
import HeaderAuth from "../components/HeaderAuth"
import {useState, useMemo, useCallback} from "react"
import RenderAccount from "../components/RenderAccount"

const Account = () => {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchData = useCallback(async()=>{
    try{
      const {data: postData} = await axios.get("http://localhost:3000/api/posts");
      setListOfPosts(postData); 
    }catch(err){
      console.error(err);
    } 
  },[]);

  useMemo(()=>{fetchData()},[fetchData]);

  return (
    <main className = "flex column justifyContent" id = "dashboard">
      <HeaderAuth className = {"pages"}/>
      <h1 className = "justifyContent flex">Welcome to Your Account</h1>
      <div className = "table-wrapper flex justifyContent">
    <table>

      <thead>
        <tr>
        <th>Image</th>
        <th>Post Title</th>
        <th>Like/Comment</th>
        <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
      <RenderAccount posts = {posts} setPosts = {setPosts} listOfPosts = {listOfPosts}/>

      </tbody>
    </table>
    </div>
    </main>
  )
}

export default Account