import axios from "axios"

const handleDelete = async(e, id)=>{
    try{
        e.preventDefault();
        axios.delete(`http://localhost:8000/deletePost/${id}`)
          .then(res=>{
            console.log(res);
            window.location.reload();
          })
    }catch(err){
      console.error(err);
    }
  };

const handleLike = async(e,id)=>{
    try{
      e.preventDefault();
      const response = await axios.put(`http://localhost:8000/addLike/${id}`)
      console.log(response.data);
      window.location.reload();
    }catch(err){
      console.error(err);
    }
  }


export {handleDelete, handleLike}