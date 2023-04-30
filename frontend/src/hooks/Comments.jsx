import axios from "axios"

const handleDelete = async(e, id)=>{
    try{
      e.preventDefault();
      const response = await axios.delete(`http://localhost:8000/deleteComment/${id}/${localStorage.getItem("postId")}`);
      
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
      const currentUser = user.find(ele=>ele.googleId === localStorage.getItem("id"));

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
};

const handleReply = async(e, user, reply) => {
    try{
      e.preventDefault();
      const formData = new URLSearchParams();

      const currentUser = user.find(ele=>ele.googleId === localStorage.getItem("id"));

      formData.append("user", localStorage.getItem("id"));
      formData.append("displayName", currentUser.displayName);
      formData.append("email", currentUser.email);
      formData.append("reply", reply);
      axios.put(`http://localhost:8000/addReplies/${localStorage.getItem("commentId")}/${localStorage.getItem("postId")}`, formData, {})
        .then(res=>{
          console.log(res)
          window.location.reload();
        });
    }catch(err){
      console.error(err);
    }
};

const handleReplyDelete = async(e, replyId, commentId) => {
  try{
    e.preventDefault();
    
    await axios.delete(`http://localhost:8000/deleteReply/${commentId}/${replyId}/${localStorage.getItem("postId")}`)
      .then(res=>{
        console.log(res)
        // window.location.reload();
      });

  }catch(err){
    console.error(err);
  }
};

export {handleComment,
      handleDelete,
      handleReply,
      handleReplyDelete}