import HeaderAuth from "../components/HeaderAuth"
import axios from "axios"
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

  useMemo(()=>{fetchData()},[fetchData]);

  const renderPosts = useCallback(()=>{
    if(listOfPosts){
      const postArray = [];
      listOfPosts.forEach(drawing=>{
        if(drawing.user === localStorage.getItem("id")){
          postArray.push(
            <section key = {drawing._id} className="post column alignItems flex">
            <h2>{drawing.title}</h2>

            <div className = "flex">
              <section>
              <i className="fa-solid fa-thumbs-up"><span>{drawing.likes}</span></i>
              </section>
              <section>
              <i className="fa-solid fa-comment"><span>{drawing.comments.length}</span></i>
              </section>
            </div>

            <div className = "flex justifyContent icons">
            <i className = "fa-solid fa-trash"></i>
            <button className = "fa-solid fa-pen-to-square" onClick = {()=>handleEdit(drawing._id)}></button>
            </div>

            <img src = {drawing.post} alt = {`Drawing of ${drawing.title}`}/>
       
          </section>
          );
        };
      });
      return postArray;
    }
  },[listOfPosts, handleEdit]);

  useMemo(()=>{setPosts(renderPosts())},[renderPosts]);

  return (
    <main>
    <HeaderAuth/>
    <h1>Account</h1>
    <section id = "table" className = "flex">
      {posts}
    </section>
    </main>
  )
}

export default Account