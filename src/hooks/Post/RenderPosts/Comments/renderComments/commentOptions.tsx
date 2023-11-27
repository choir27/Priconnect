import {Button} from "../../../../../components/Button"
import {addCommentLike} from "../manageComments/addCommentLike"
import {CommentOptionsInterface, CommentLike} from "../../../../../middleware/Interfaces"
import {useContext} from "react"
import {ApiContext} from "../../../../../middleware/Context"
import {getEmail} from "../../../../../middleware/Sessions"
import {deleteComment} from "../manageComments/deleteComment"

export default function CommentOptions(props: CommentOptionsInterface){

    const {user} = useContext(ApiContext);

    let duplicates = "";

    let commentId = ""

    if(props.post){

        const comment = JSON.parse(props?.post?.comments[props?.index]);

        commentId = comment.id;

        if(comment?.likes[0]){
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
                {commentId === user.email || commentId === getEmail() ? Button({text: "", classNames: "fa-solid fa-trash-can button", onClick: ()=>deleteComment({post: props.post, index: props.index})}) : ""}
            </div>
        );            
    }
}