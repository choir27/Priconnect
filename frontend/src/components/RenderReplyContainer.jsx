import {useState, useEffect, useCallback} from "react"
import axios from "axios"

const RenderReplyContainer = ({user, setShowReply, showReply}) => {
 
    const [responseDisplay, setResponseDisplay] = useState([]);
    const [addHidden, setAddHidden] = useState("");
    const [reply, setReply] = useState("");

    useEffect(()=>{
        showReply ? setAddHidden("show") : setAddHidden("hidden");
        
      },[showReply, setAddHidden]);

      
    const handleHideResponse = useCallback(async(e)=>{
        e.preventDefault();
        setShowReply(false);
      },[setShowReply]);

      useEffect(()=>{

        const handleReply = async(e) => {
          try{
            e.preventDefault();
            const formData = new URLSearchParams();

            const currentUser = user.find(ele=>ele.googleId === localStorage.getItem("id"));

            formData.append("user", localStorage.getItem("id"));
            formData.append("displayName", currentUser.displayName);
            formData.append("email", currentUser.email);
            formData.append("reply", reply);
            axios.put(`http://localhost:8000/addReplies/${localStorage.getItem("commentId")}/${localStorage.getItem("postId")}`, formData, {})
              .then(res=>console.log(res));
          }catch(err){
            console.error(err);
          }
        }

        setResponseDisplay(    
        <section id = "reply" className = {`flex ${addHidden}`}>
            <small className = "flex" onClick = {(e)=>{handleHideResponse(e)}}>
                <i className = "fa-solid fa-xmark"></i>
            </small>
            <form className = "flex column" onSubmit = {(e)=>handleReply(e)}>
              <textarea onChange = {(e)=>setReply(e.target.value)}/>
              <button className = "button">Add Response</button>
            </form>
        </section>
        )
      },[addHidden, setShowReply ,handleHideResponse, reply, user]);

    return responseDisplay
}

export default RenderReplyContainer