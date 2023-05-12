import axios from "axios"

const trim = (string) => {
  if(string.length > 150){
    return string.substring(0,152) + "..."
  }else{
    return string
  }
};

const handleDelete = async(e,id)=>{
  try{
    e.preventDefault();
    const response = await axios.delete(`https://priconne-backend.onrender.com/deletePost/${id}`);
    console.log(response.data);
    window.location.reload();
  }catch(err){
    console.error(err);
  }
}

const handleLike = async(e,id)=>{
  try{
    e.preventDefault();
    const response = await axios.put(`https://priconne-backend.onrender.com/addLike/${id}`);
    console.log(response.data);
    window.location.reload();
  }catch(err){
    console.error(err);
  }
}

const handleComment = async(e,id,navigate)=>{
  try{
    e.preventDefault();
    localStorage.setItem("postId",id);
    navigate("/comments");
  }catch(err){
    console.error(err);
  }
}

export {trim,
        handleLike,
        handleDelete,
        handleComment}