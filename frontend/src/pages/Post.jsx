import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useCallback, useState} from "react"
import {toast} from "react-toastify"
import HeaderAuth from "../components/HeaderAuth"

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
    <main className = "flex column">
    <HeaderAuth className = {"pages"}/>
    <div className = "flex justifyContent">
    <section className = "flex column alignItems" id = "add">

    <form onSubmit = {handleSubmit}>
    <h1 className = "flex justifyContent">Add Post</h1>

    <section className = "flex form">
    <section>
    <h2>Add</h2>

    <label className = "button" htmlFor="file">Choose File</label>
        <input
          id="file"
          name="file"
          accept="image/*"
          type="file"
          onChange={(e)=>setPost(e.target.files[0])}
          className="hidden"
        />
    </section>
        <section>
           <h2>Status</h2>
                <select id="status" name="status" class = 'button'>
                    <option value="public" selected>Public</option>
                    <option value="private">Private</option>
                </select>
        </section>
    </section>

    <section className = "flex justifyContent">
      <input  spellcheck = {true} className = "input" type = "text" name = "title" onChange = {(e)=>setTitle(e.target.value)} placeholder = "Give your artwork/post a title here"/>
    </section>

    <section className = "flex justifyContent textarea">
      <textarea spellcheck = {true} wrap = "hard" className = "input" type = "text" name = "description" placeholder = "Put description of your post here!"/>
    </section>

    <section className = "flex submit">
    <input type = "submit" className = "button"/>
    </section>

    
    </form>
      </section>
      </div>
    </main>
  )
}

export default Post