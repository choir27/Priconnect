import {Button} from "../../../../../components/Button"
import {addCommentLike} from "../manageComments/addCommentLike"
import {Post, CommentLike} from "../../../../../middleware/Interfaces"
import {useContext} from "react"
import {ApiContext} from "../../../../../middleware/Context"
import {getEmail} from "../../../../../middleware/Sessions"

interface CommentOptionsInterface{
    post: Post,
    index: number
}

export default function CommentOptions(props: CommentOptionsInterface){

    const {user} = useContext(ApiContext);

    let duplicates = "";

    const comment = JSON.parse(props.post.comments[props.index]);

    if(comment.likes[0]){
        const findDuplicate = comment?.likes?.find((commentLike: CommentLike)=>
            commentLike?.id === user.email || commentLike?.id === getEmail()
        );

        if(findDuplicate){
            duplicates = findDuplicate?.id;
        }
    }

    const checkLikeLogic: string = duplicates ? "fa-solid fa-heart button" : "fa-regular fa-heart button"

    return(
        <div className = "flex alignItems justifyContent">
            {comment?.likes?.length}{Button({text: "", classNames: checkLikeLogic, onClick: ()=>addCommentLike(props.post, props.index, user)})}
            {Button({text: "", classNames: "fa-solid fa-trash-can button", onClick: ()=>""})}
        </div>
    )
}