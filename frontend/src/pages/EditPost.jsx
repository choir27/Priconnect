import {useCallback, useState, useMemo, useEffect} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import HeaderAuth from "../components/HeaderAuth"

const EditPost = () => {

    const [listOfPosts, setListOfPosts] = useState([]); 
    const [currentPost, setCurrentPost] = useState({});
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const fetchData = useCallback(async() => {
        const {data: postData} = await axios.get("http://localhost:3000/api/posts");
        setListOfPosts(postData);
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
        setPost(currentPost.post);
        setStatus(currentPost.status);
        }
    },[currentPost.description, currentPost.title, currentPost.post, currentPost.status, currentPost, listOfPosts]);
    
    const handleSubmit = useCallback(async(e) => {
        try{
            e.preventDefault();


            const TITLE_REGEX = /^[a-zA-Z\s]*$/;
            const checkTitle = TITLE_REGEX.test(title);

            if(!post || !title){
              toast.error("No Input Detected, Please Try Again!");
              return;
            }
    
            if(!checkTitle){
              toast.error("Title Input Must Not Include Numbers/Special Characters");
              return;
            }
    
            if(post.includes("https://res.cloudinary.com/melt/image/upload")){
              if(!post.includes("png") && !post.includes("jpg") && !post.includes("jpeg") && !post.includes("webp")){
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

            if(post.includes("https://res.cloudinary.com/melt/image/upload")){
            formData.append("file", post);
            formData.append("fileName", post);
            formData.append("cloudinaryId", currentPost.cloudinaryId);
          }
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
    },[navigate, post, title, status, description, currentPost._id]);

    return (
        <main className = "flex column">
        <HeaderAuth className = {"pages"}/>
        <div className = "flex justifyContent">
    <section className = "flex column alignItems" id = "add">


            {currentPost && listOfPosts && post ?
                <form onSubmit={handleSubmit}>
                            <h1 className = "flex justifyContent">Edit Your Post</h1>

<section className = "flex form">
                    <section>
                    <h2>Add</h2>

                    <label htmlFor="file" className = "button">
                      Upload file: {post.name || currentPost.fileName }
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
      <input spellCheck = {true} className = "input" defaultValue={post ? currentPost.title : title} type = "text" name = "title" onChange = {(e)=>setTitle(e.target.value)}/>
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