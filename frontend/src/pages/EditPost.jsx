import {useCallback, useState, useMemo} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const EditPost = () => {

    const [listOfPosts, setListOfPosts] = useState([]); 
    const [currentPost, setCurrentPost] = useState({});
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

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
            formData.append("fileName",post.name)
            formData.append("title", title);
            formData.append("user", localStorage.getItem("id"));
      
            await axios.put(`http://localhost:8000/editPost/${currentPost._id}`, formData)
              .then(res=>{
                console.log(res);
                navigate("/account");
              })
              

        }catch(err){
            console.error(err);
        }
    },[navigate, post, title, currentPost._id]);

    return (
        <main>
            <h1>Edit Your Post</h1>

            {currentPost && listOfPosts ?
            <section>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" defaultValue={currentPost.title} onChange = {(e)=>setTitle(e.target.value)}/>
                    <label htmlFor="file">
                      Upload file: {post.name || currentPost.fileName }
                      <input type="file" name="file" onChange = {(e)=>setPost(e.target.files[0])} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </section> 
            : 
            "An Unexpected Error has occured, please try again"}
        </main>
    )
}

export default EditPost