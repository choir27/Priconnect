import HeaderAuth from "../components/HeaderAuth"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useCallback, useState} from "react"
import {toast} from "react-toastify"

const Post = () => {

  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleSubmit = useCallback(async(e) => {
    try{
      e.preventDefault();

      const TITLE_REGEX = /^[a-zA-Z]*$/;

      const checkTitle = TITLE_REGEX.test(title);

      if(!post || !title){
        toast.error("No Input Detected, Please Try Again!");
        return;
      }

      if(!checkTitle){
        toast.error("Title Input Must Not Include Numbers/Special Characters");
        return;
      }

      if(!post.type.includes("png") && !post.type.includes("jpg") && !post.type.includes("jpeg") && !post.type.includes("webp")){
        toast.error("Please Input A Picture File");
        return;
      }

      const formData = new FormData();
      formData.append("file", post);
      formData.append("fileName", post.name);
      formData.append("title", title);
      formData.append("user", localStorage.getItem("id"));

      await axios.post("http://localhost:8000/post", formData)
        .then(res=>{
          console.log(res);
          navigate("/account");
        })
        
    }catch(err){
      console.error(err);
    }

  },[title, post, navigate]);

  return (
    <main>
    <HeaderAuth/>
    <h1>Post</h1>
    <form onSubmit = {handleSubmit}>
      <label htmlFor="file">Choose File</label>
        <input
          id="file"
          name="file"
          accept="image/*"
          className="hidden"
          type="file"
          onChange={(e)=>setPost(e.target.files[0])}
        />
        <input type = "text" name = "title" onChange = {(e)=>setTitle(e.target.value)} placeholder = "Give your artwork/post a title"/>
        <button type = "submit">Submit</button>
    </form>
    </main>
  )
}

export default Post