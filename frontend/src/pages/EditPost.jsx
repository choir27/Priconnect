import {useCallback, useState, useMemo, useEffect} from "react"
import axios from "axios"
import {toast} from "react-toastify"
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

    const fetchData = useCallback(async() => {
        const {data: postData} = await axios.get("http://localhost:3000/api/posts");
        setListOfPosts(postData);
    },[]);

    const trim = (str) => {
      if(str){
      if(str.length > 24){
        return str.substring(0,25) + "...";
      }else{
        return str;
      }
    }
    }

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
        }
    },[currentPost.description, currentPost.title, currentPost.post, currentPost.status, currentPost, listOfPosts]);
    
    const handleSubmit = useCallback(async(e) => {
        try{
            e.preventDefault();

            const TITLE_REGEX = /^[a-zA-Z\s]*$/;
            const checkTitle = TITLE_REGEX.test(title);

            if(!defaultPost || !description || !title){
              toast.error("No Input Detected, Please Try Again!");
              return;
            }
    
            if(!checkTitle){
              toast.error("Title Input Must Not Include Numbers/Special Characters");
              return;
            }
    
            if(defaultPost.includes("https://res.cloudinary.com/melt/image/upload")){
              if(!defaultPost.includes("png") && !defaultPost.includes("jpg") && !defaultPost.includes("jpeg") && !defaultPost.includes("webp")){
                toast.error("Please Input A Picture File");
                return;
              }
          }else{
            if(!post.type.includes("png") && !post.type.includes("jpg") && !post.type.includes("jpeg") && !post.type.includes("webp")){
              toast.error("Please Input A Picture File");
              return;
            }
          }

            const [usersResponse] = await Promise.all([
              axios.get("http://localhost:8000/api/users"),
            ]);

            const formData = new FormData();

            if(!post){
            formData.append("file", defaultPost);
            formData.append("fileName", currentPost.fileName);
            formData.append("cloudinaryId", currentPost.cloudinaryId);
          }
            formData.append("file", post);
            formData.append("fileName", post.fileName);
            formData.append("comments", currentPost.comments);
            formData.append("likes", currentPost.likes);
            formData.append("title", title);
            formData.append("status", status);
            formData.append("description", description);
            formData.append("user", localStorage.getItem("id"));
            formData.append("displayName", usersResponse.data[0].displayName);

            await axios.put(`http://localhost:8000/editPost/${currentPost._id}`, formData)
              .then(res=>{
                console.log(res);
                navigate("/account");
              })   

        }catch(err){
            console.error(err);
        }
    },[navigate, post, title, status, description, currentPost._id, currentPost.cloudinaryId, currentPost.comments, currentPost.likes, defaultPost, currentPost.fileName]);

    return (
        <main className = "flex column">
        <HeaderAuth className = {"pages"}/>
        <div className = "flex justifyContent">
    <section className = "flex column alignItems" id = "add">

            {currentPost && listOfPosts && defaultPost?
                <form onSubmit={handleSubmit}>
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
                <select name="status" className = 'button' onChange = {(e)=>setStatus(e.target.value)}>
                    <option value="public" defaultValue = {status || currentPost.status}>Public</option>
                    <option value="private">Private</option>
                </select>
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
            "An Unexpected Error has occured, please try again"}
                        </section>
                 </div>
        </main>
    )
}

export default EditPost