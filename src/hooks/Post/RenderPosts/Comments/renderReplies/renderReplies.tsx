import { CommentOptionsInterface } from "../../../../../middleware/Interfaces";
import ReplyOptions from "../manageReplies/replyOptions";

export default function RenderReplies(post: CommentOptionsInterface){

    if(post && post.post && post.post.comments && post.post.comments[post.index]){
        const comments = JSON.parse(post.post.comments[post.index]);

        const listOfComments = comments.replies.map((reply: any)=>{
            return(
                <article key = {`${reply.id} ${reply.comment} ${post.post.$id} ${post.post.likes} ${post.post.$createdAt} ${post.post.$updatedAt} ${post.post.text}`}>
                    {reply.comment}
                    <ReplyOptions/>
                </article>
            );
        });

        return(
            <section>
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