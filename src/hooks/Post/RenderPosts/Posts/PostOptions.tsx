import {Button} from "../../../../components/Button"
import {PostOptionsInterface} from "../../../../middleware/Interfaces";
import {useState, useContext} from "react"
import {useNavigate} from "react-router"
import CommentHub from "../Comments/renderComments/commentHub"
import {totalLikes} from "../Likes/totalLikes"
import {addLike} from "../Likes/addLike"
import {deletePost} from "../../ManagePosts/DeletePost"
import { getEmail } from "../../../../middleware/Sessions";
import SubscribeToAccount from "../../../Account/subscribeToAccount";
import {ApiContext} from "../../../../middleware/Context"

export default function PostOptions(props: PostOptionsInterface):React.JSX.Element{

    const [optionDisplay, setOptionDisplay] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user} = useContext(ApiContext);

    return(
    <section>
        <div className = "flex alignItems justifyContent">
            <CommentHub post = {props.post} user = {props.props.user} navigate = {navigate} comment = {""}/>
            <span>{props.post.likes[0] ? totalLikes(props.post.likes) : 0}</span>{Button({text: "", classNames: props.checkLikeLogic, onClick: ()=>addLike({post: props.post, user: props.props.user, navigate: navigate})})}
            {Button({text: "", classNames: "fa-solid fa-ellipsis-vertical button", onClick: ()=>setOptionDisplay(!optionDisplay)})}
        </div>

        {optionDisplay ? 
            <section>
                <div>
                    {props.post.email === props.props.user.email || props.post.email === getEmail() ? Button({text: "", classNames: "fa-solid fa-trash-can button", onClick: ()=>deletePost(props.post, navigate)}): ""}
                    {Button({text: "", classNames: "fa-solid fa-repeat button", onClick: ()=>""})}
                    {props.post.email !== props.props.user.email || props.post.email !== getEmail() ? Button({text: `Subscribe To ${props.post.email}`, onClick: ()=>SubscribeToAccount(props.post.email, user.email)}) : ""}
                </div>         
            </section>
        : ""}
    </section>
    )
   

};      