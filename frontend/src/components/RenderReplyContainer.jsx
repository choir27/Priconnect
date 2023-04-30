import {useState, useEffect, useCallback} from "react"
import {handleReply} from "../hooks/Comments"

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

        setResponseDisplay(    
        <section id = "reply" className = {`flex ${addHidden}`}>
            <small className = "flex" onClick = {(e)=>{handleHideResponse(e)}}>
                <i className = "fa-solid fa-xmark"></i>
            </small>
            <form className = "flex column" onSubmit = {(e)=>handleReply(e, user, reply)}>
              <textarea onChange = {(e)=>setReply(e.target.value)}/>
              <button className = "button">Add Response</button>
            </form>
        </section>
        )
      },[addHidden, setShowReply ,handleHideResponse, reply, user]);

    return responseDisplay
}

export default RenderReplyContainer