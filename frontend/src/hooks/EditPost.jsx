import axios from "axios"
import {toast} from "react-toastify"

const handleSubmit = async(e, defaultPost, description, title, post, currentPost, status, navigate) => {
    try{
        e.preventDefault();

        if(!defaultPost || !description || !title){
          toast.error("No Input Detected, Please Try Again!");
          return;
        };

        if(defaultPost.includes("https://res.cloudinary.com/melt/image/upload")){
          if(!defaultPost.includes("png") && !defaultPost.includes("jpg") && !defaultPost.includes("jpeg") && !defaultPost.includes("webp")){
            toast.error("Please Input A Picture File");
            return;
          };
        }else{
            if(!post.type.includes("png") && !post.type.includes("jpg") && !post.type.includes("jpeg") && !post.type.includes("webp")){
              toast.error("Please Input A Picture File");
              return;
            };
        }

        const [usersResponse] = await Promise.all([
          axios.get("https://priconne-backend-production.up.railway.app/api/users"),
        ]);

        const formData = new FormData();

        if(!post){
        formData.append("file", defaultPost);
        formData.append("fileName", currentPost.fileName);
        formData.append("cloudinaryId", currentPost.cloudinaryId);
      }else{
        formData.append("file", post);
        formData.append("fileName", post.fileName);
      };

        if(currentPost.comments.length){
          formData.append("comments", currentPost.comments);
        };
      
        formData.append("likes", currentPost.likes);
        formData.append("title", title);
        formData.append("status", status);
        formData.append("description", description);
        formData.append("user", localStorage.getItem("id"));
        formData.append("displayName", usersResponse.data[0].displayName);

        await axios.put(`https://priconne-backend-production.up.railway.app/editPost/${currentPost._id}`, formData)
          .then(res=>{
            console.log(res);
            navigate("/account");
          });

    }catch(err){
        console.error(err);
    };
};

const trim = (str) => {
    if(str){
        if(str.length > 24){
          return str.substring(0,25) + "...";
        }else{
          return str;
        }
    };
};

export {handleSubmit,
        trim}