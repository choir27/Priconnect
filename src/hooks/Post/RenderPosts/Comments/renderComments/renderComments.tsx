import {Post} from "../../../../../middleware/Interfaces"
import CommentOptions from "./commentOptions"
import ReplyHub from "../renderReplies/replyHub"
import RenderReplies from "../renderReplies/renderReplies"

export default function RenderComments(post: Post){

    if(post){
        
        const listOfComments = post.comments.map((comment: string, index: number)=>{
            const commentObj = JSON.parse(comment);

            return(
                <article key = {`${commentObj.comment}-${post.$id}-${post.$createdAt}-${post.$updatedAt}-${commentObj.user}`}>
                    <p>{commentObj.comment}</p>

                    <h2>{commentObj.id}</h2>
                 
                    <ReplyHub {...{post, index}}/>
                    <CommentOptions {...{post, index}}/>

                    <RenderReplies {...{post, index}}/>
                </article>
            )
        })

        return(
            <section>
                <h1>Comments</h1>
                {listOfComments}
            </section>
        );

    }else{
        return(
            <section>
                <h1>Loading...</h1>
            </section>
        );
    };
}