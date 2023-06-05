import {toast} from "react-toastify"
import axios from "axios"

const handleSubmit = async(e, navigate, post, title, status, description) => {
    try{
        e.preventDefault();

        if(!post || !title || !description || !status){
            toast.error("No Input Detected, Please Try Again!");
            return;
        }
  
        if(!post.type.includes("png") && !post.type.includes("jpg") && !post.type.includes("jpeg") && !post.type.includes("webp")){
          toast.error("Please Input A Picture File");
          return;
        }
    
        const [usersResponse] = await Promise.all([
          axios.get("https://priconne-backend-production.up.railway.app/api/users"),
        ]);

        const user = usersResponse.data.find(account=>account.googleId === localStorage.getItem("id"));
              
        const formData = new FormData();

        formData.append("file", post);
        formData.append("fileName", post.name);
        formData.append("title", title);
        formData.append("status", status);
        formData.append("description", description);
        formData.append("user", localStorage.getItem("id"));
        formData.append("displayName", user.displayName);
        
       axios.post("https://priconne-backend-production.up.railway.app/post", formData)
          .then(res=>{
            console.log(res);
            navigate("/account");
          })
            
    }catch(err){
        console.error(err);
    }
}

export {handleSubmit}