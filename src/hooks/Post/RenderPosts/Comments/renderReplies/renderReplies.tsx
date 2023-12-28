import {
  CommentOptionsInterface,
  Reply,
} from "../../../../../middleware/Interfaces";
import ReplyOptions from "../manageReplies/replyOptions";

export default function RenderReplies(props: CommentOptionsInterface) {
  if (
    props &&
    props.post &&
    props.post.comments &&
    props.post.comments[props.index] &&
    JSON.parse(props.post.comments[props.index]).replies.length
  ) {
    const comments = JSON.parse(props.post.comments[props.index]);

    const listOfComments = comments.replies.map(
      (reply: Reply, index: number) => {
        return (
          <article
            key={`${reply.id} ${reply.comment} ${props.post.$id} ${props.post.likes} ${props.post.$createdAt} ${props.post.$updatedAt} ${props.post.text}`}
          >
            THIS IS A REPLY:
            <h2>{reply.comment}</h2>
            <ReplyOptions
              {...{ post: props.post, index: props.index, replyIndex: index }}
            />
          </article>
        );
      },
    );

    return <section>{listOfComments}</section>;
  } else {
    return (
      <section>
        <h1>There are no replies to render right now.</h1>
      </section>
    );
  }
}
