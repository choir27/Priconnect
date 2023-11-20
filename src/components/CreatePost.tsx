import {TextInput} from "../hooks/Post/Inputs"
import {Button} from "../components/Button"
import CreatePost from "../hooks/Post/CreatePost"
import {useStore} from "../middleware/Zustand/States"
import {Action, State} from "../middleware/Zustand/Types"
import ImageUpload from "../hooks/Post/UploadImage"

export default function CreatePostHub(){

    const setText = useStore((action: Action) => action.setText);
    const text = useStore((state: State)=> state.text);
    const image = useStore((state:State)=>state.image);

    return(
        <form>
            {TextInput({setText: (e:string)=> setText(e)})}

            <ImageUpload/>

            {Button({text: "Create Post", classNames: "button", onClick: ()=> CreatePost({text: text, image: image})})}

            {image.original_filename}
        </form>
    )
}