import {TextInput} from "../hooks/Post/Inputs"
import {Button} from "../components/Button"
import CreatePost from "../hooks/Post/CreatePost"
import {useStore} from "../middleware/States"
import {Action, State} from "../middleware/Types"

export default function CreatePostHub(){

    const setText = useStore((action: Action) => action.setText);
    const text = useStore((state: State)=> state.text);

    return(
        <form>
            {TextInput({setText: (e:string)=> setText(e)})}

            {Button({text: "Create Post", onClick: ()=> CreatePost({text: text})})}

        </form>
    )
}