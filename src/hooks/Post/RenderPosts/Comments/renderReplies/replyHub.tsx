import {Button} from "../../../../../components/Button"
import {CommentOptionsInterface} from "../../../../../middleware/Interfaces"
import {ReplyInput} from "../../../Inputs"
import {useStore} from "../../../../../middleware/Zustand/States"
import {Action, State} from "../../../../../middleware/Zustand/Types"
import {totalComment} from "../manageComments/totalComments"
import {addReply} from "../manageReplies/addReply"
import {useNavigate} from "react-router"
import {useContext} from "react"
import {ApiContext} from "../../../../../middleware/Context"

export default function ReplyHub(props: CommentOptionsInterface){
    const setReply = useStore((action: Action) => action.setComment);

    const reply = useStore((state: State)=>state.comment);

    const {user} = useContext(ApiContext);
    const navigate = useNavigate();

    return(
        <section>
            {ReplyInput({setComment: (e:string)=> setReply(e)})}
            {totalComment(props.post.comments)}
            {Button({text: "", classNames: "fa-regular fa-comment button", onClick: ()=>addReply({post: props.post, navigate: navigate, user: user, comment: reply}, props.index)})}

        </section>
    )
}