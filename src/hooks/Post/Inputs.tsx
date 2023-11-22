import {TextInputInterface, CommentInputInterface} from "../../middleware/Interfaces"

export function TextInput(props: TextInputInterface){
    return(
        <input 
        placeholder = "Write a Post" 
        minLength = {1} 
        maxLength = {1000} 
        onChange ={(e)=>props.setText(e.target.value)} 
        type = "text" 
        name ="text" 
        id = "text"
        />
    )
}

export function CommentInput(props: CommentInputInterface){
    return(
        <input
        placeholder = "Add a Comment"
        minLength = {1}
        maxLength = {1000}
        onChange = {(e)=>props.setComment(e.target.value)}
        type = "text"
        name = "comment"
        id = "comment"
        />
    )
}