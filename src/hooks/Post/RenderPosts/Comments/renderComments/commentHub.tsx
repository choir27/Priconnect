import {Button} from "../../../../../components/Button"
import {addComment} from "../manageComments/addComment"
import {addCommentInterface} from "../../../../../middleware/Interfaces"
import {CommentInput} from "../../../Inputs"
import {useStore} from "../../../../../middleware/Zustand/States"
import {Action, State} from "../../../../../middleware/Zustand/Types"
import {totalComment} from "../manageComments/totalComments"

export default function CommentHub(props: addCommentInterface){

    const setComment = useStore((action: Action) => action.setComment);

    const comment = useStore((state: State)=>state.comment);

    return(
        <section>
            {CommentInput({setComment: (e:string)=> setComment(e)})}
            {totalComment(props.post.comments)}
            {Button({text: "", classNames: "fa-regular fa-comment button", onClick: ()=>addComment({post: props.post, navigate: props.navigate, user: props.user, comment: comment})})}

        </section>
    )
}