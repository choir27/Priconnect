import axios from "axios"
import HeaderAuth from "../components/HeaderAuth"
import {useState, useMemo, useCallback} from "react"
import {useNavigate} from "react-router-dom"

const Account = () => {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async()=>{
    const {data: postData} = await axios.get("http://localhost:3000/api/posts");
    setListOfPosts(postData);  
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

  useMemo(()=>{fetchData()},[fetchData]);

  const renderPosts = useCallback(()=>{
    if(listOfPosts){
      const postArray = [];
      listOfPosts.forEach(post=>{
        if(post.user === localStorage.getItem("id")){
          postArray.push(
            <tr key = {post._id}>
               <td className = "tableImage">
            <img src = {post.post} alt = {`Post of ${post.title}`}/>
            </td>

            <td>{post.title}</td>

            <td className = "icons buttons">
              <i className="fa-solid fa-thumbs-up button"><span>{post.likes}</span></i>
              <i className="fa-solid fa-comment button"><span>{post.comments.length}</span></i>
            </td>

            <td className = "buttons">
            <button className = "fa-solid fa-trash button" onClick = {(e)=>{
                e.preventDefault();
                handleDelete(post._id)}}></button>
            <button className = "fa-solid fa-pen-to-square button" onClick = {()=>handleEdit(post._id)}></button>
            </td>

           
          </tr>
          );
        };
      });
      return postArray;
    }
  },[listOfPosts, handleEdit, handleDelete]);

  useMemo(()=>{setPosts(renderPosts())},[renderPosts]);

  return (
    <main className = "flex column justifyContent" id = "dashboard">
      <HeaderAuth className = {"pages"}/>
      <h1 className = "justifyContent flex">Welcome to Your Account</h1>
      <div className = "table-wrapper">
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
      {posts}

      </tbody>
    </table>
    </div>
    </main>
  )
}

export default Account