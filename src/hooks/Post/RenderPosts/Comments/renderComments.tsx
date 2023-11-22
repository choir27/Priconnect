import {Post} from "../../../../middleware/Interfaces"
import {Button} from "../../../../components/Button"
import CommentHub from "./commentHub"
import {useNavigate} from "react-router"
import {ApiContext} from "../../../../middleware/Context"
import {useContext} from "react"

export default function RenderComments(post: Post){

    const navigate = useNavigate();
    const {user} = useContext(ApiContext);

    if(post){
        
        const listOfComments = post.comments.map((comment: string)=>{
            const commentObj = JSON.parse(comment);

            return(
                <article key = {`${commentObj.comment}-${post.$id}-${post.$createdAt}-${post.$updatedAt}-${commentObj.user}`}>
                    <p>{commentObj.comment}</p>
                    <div className = "flex alignItems justifyContent">
                    <CommentHub post = {post} user = {user} navigate = {navigate} comment = {""}/>
                    {Button({text: "", classNames: "fa-regular fa-heart button button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-trash-can button", onClick: ()=>""})}

                    </div>
                </article>
            )
        })

        return(
            <section>
                <h1>Comments</h1>
                {listOfComments}
            </section>
        )

    }else{
        <section>
            <h1>Loading...</h1>
        </section>
    }
}