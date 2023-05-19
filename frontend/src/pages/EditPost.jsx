import {useCallback, useState, useMemo, useEffect} from "react"
import axios from "axios"
import {handleSubmit, trim} from "../hooks/EditPost"
import {useNavigate} from "react-router-dom"
import HeaderAuth from "../components/HeaderAuth"

const EditPost = () => {

  const [listOfPosts, setListOfPosts] = useState([]); 
  const [currentPost, setCurrentPost] = useState({});
  const [title, setTitle] = useState("");
  const [defaultPost, setDefaultPost] = useState("");
  const [post, setPost] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const fetchData = useCallback( async()=> {
      const [postsResponse] = await Promise.all([
        axios.get("https://priconne-backend-production.up.railway.app/api/posts")
      ])
      setListOfPosts(postsResponse.data);
  },[]);

  useMemo(()=>{fetchData()},[fetchData]);

  useMemo(()=>{
      if(listOfPosts){
          listOfPosts.forEach(post=>{
              if(post._id === localStorage.getItem("postId")){
                  setCurrentPost(post);
              };
          });
      };
  },[listOfPosts]);

  useEffect(()=>{
    if(currentPost && listOfPosts){
      setTitle(currentPost.title);
      setDescription(currentPost.description);
      setDefaultPost(currentPost.post);
      setStatus(currentPost.status);
    };
  },[currentPost.description, currentPost.title, currentPost.post, currentPost.status, currentPost, listOfPosts]);
        

  return (
    <main className = "flex column">
      <HeaderAuth className = {"pages"}/>
        <div className = "flex justifyContent">
          <section className = "flex column alignItems" id = "add">

            {currentPost && listOfPosts && defaultPost?
              <form onSubmit={(e)=>handleSubmit(e, defaultPost, description, title, post, currentPost, status, navigate)}>
                <h1 className = "flex justifyContent">Edit Your Post</h1>

                <section className = "flex form">
                    
                  <section>
                    <h2>Add</h2>

                    <label htmlFor="file" className = "button">
                      Upload file: {post ? trim(post.name) : trim(currentPost.fileName) }
                      <input id ="file" type="file" name="file" accept = "image/*" className = "hidden" onChange = {(e)=>setPost(e.target.files[0])} />
                    </label>
                  </section>
                    
                  <section>
                    <h2>Status</h2>

                    {status ? 
                      <select name="status" className = 'button'  defaultValue={currentPost.status} onChange = {(e)=>setStatus(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    :
                      <select name="status" className = 'button'  defaultValue = {status} onChange = {(e)=>setStatus(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    }
                  </section>
                </section>

                <section className = "flex justifyContent">
                  <input spellCheck = {true} className = "input" defaultValue={defaultPost ? currentPost.title : title} type = "text" name = "title" onChange = {(e)=>setTitle(e.target.value)}/>
                </section>
    
                <section className = "flex justifyContent textarea">
                  <textarea spellCheck = {true} wrap = "hard" type = "text" name = "description" defaultValue = {currentPost.description} onChange={(e)=>setDescription(e.target.value)}/>
                </section>

                <section className = "flex submit">
                  <input type = "submit" className = "button"/>
                </section>
              </form>
            : 
      <h1>Loading...</h1>
            }
          </section>
        </div>
    </main>
  )
}

export default EditPost