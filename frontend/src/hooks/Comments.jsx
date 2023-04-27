const handleDelete = async(e, id)=>{
    try{
    e.preventDefault();
    const response = await axios.delete(`http://localhost:8000/deleteComment/${id}`)
    
    const deleteComments = response.data;

    console.log(deleteComments);

    window.location.reload();
    }catch(err){
        console.error(err);
    }
  };


const handleComment = async(e,user,comments) => {
    try{
    e.preventDefault();
      const currentUser = user.find(ele=>ele.googleId === localStorage.getItem("id"))
      if(currentUser){        
      const response = await axios.post(`http://localhost:8000/addComment/${localStorage.getItem("postId")}`, {
        user: localStorage.getItem("id"),
        email: currentUser.email, 
        displayName: currentUser.displayName,
        comments: comments,
      });
      const updatedComments = response.data;

      console.log(updatedComments);

      window.location.reload();
    }
    }catch(err){
        console.error(err);
    }
  }

  export {handleComment,
        handleDelete}