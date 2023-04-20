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
            <section key = {post._id} className="post column alignItems flex">
            <h2>{post.title}</h2>

            <div className = "flex">
              <section>
              <i className="fa-solid fa-thumbs-up"><span>{post.likes}</span></i>
              </section>
              <section>
              <i className="fa-solid fa-comment"><span>{post.comments.length}</span></i>
              </section>
            </div>

            <div className = "flex justifyContent icons">
            <button className = "fa-solid fa-trash" onClick = {(e)=>{
                e.preventDefault();
                handleDelete(post._id)}}></button>
            <button className = "fa-solid fa-pen-to-square" onClick = {()=>handleEdit(post._id)}></button>
            </div>

            <img src = {post.post} alt = {`Post of ${post.title}`}/>
       
          </section>
          );
        };
      });
      return postArray;
    }
  },[listOfPosts, handleEdit, handleDelete]);

  useMemo(()=>{setPosts(renderPosts())},[renderPosts]);

  return (
    <main>
    <h1>Account</h1>
    <section id = "table" className = "flex">
      {posts}
    </section>
    </main>
  )
}

export default Account