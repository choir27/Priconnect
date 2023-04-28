import {toast} from "react-toastify"
import axios from "axios"

const handleSubmit = async(e, navigate, post, title, status, description) => {
    try{
        e.preventDefault();

        const TITLE_REGEX = /^[a-zA-Z\s]*$/;

        const checkTitle = TITLE_REGEX.test(title);

        if(!post || !title || !description || !status){
            toast.error("No Input Detected, Please Try Again!");
            return;
        }
    
        if(!checkTitle){
          toast.error("Title Input Must Not Include Numbers/Special Characters");
          return;
        }
    
        if(!post.type.includes("gif") && !post.type.includes("png") && !post.type.includes("jpg") && !post.type.includes("jpeg") && !post.type.includes("webp")){
          toast.error("Please Input A Picture File");
          return;
        }
    
        const [usersResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/users"),
        ]);
    
        const formData = new FormData();

        formData.append("file", post);
        formData.append("fileName", post.name);
        formData.append("title", title);
        formData.append("status", status);
        formData.append("description", description);
        formData.append("user", localStorage.getItem("id"));
        formData.append("displayName", usersResponse.data[0].displayName);
        
        await axios.post("http://localhost:8000/post", formData)
          .then(res=>{
            console.log(res);
            navigate("/account");
          })
            
    }catch(err){
        console.error(err);
    }
}

export {handleSubmit}