import {TextInputInterface} from "../../middleware/Interfaces"

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