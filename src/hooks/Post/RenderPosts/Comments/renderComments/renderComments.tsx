import { Post } from "../../../../../middleware/Interfaces";
import CommentOptions from "./commentOptions";
import ReplyHub from "../renderReplies/replyHub";
import RenderReplies from "../renderReplies/renderReplies";
import { getEmail } from "../../../../../middleware/Sessions";
import { useContext } from "react";
import { ApiContext } from "../../../../../middleware/Context";

export default function RenderComments(post: Post) {
  const { user } = useContext(ApiContext);

  if (post && post.comments.length) {
    return post.comments.map((comment: string, index: number) => {
      const commentObj = JSON.parse(comment);

      if (
        window.location.href.includes("account") &&
        (commentObj.id === user.email || commentObj.id === getEmail())
      ) {
        return (
          <article
            className="post"
            key={`${commentObj.comment}-${post.$id}-${post.$createdAt}-${post.email}-${post.$updatedAt}-${commentObj.user}-${index}`}
          >
            <p>{commentObj.comment}</p>

            {/* <h2>{commentObj.id}</h2> */}

            <ReplyHub {...{ post, index }} />
            <CommentOptions {...{ post, index }} />

            <RenderReplies {...{ post, index }} />
          </article>
        );
      } else if (!window.location.href.includes("account")) {
        return (
          <article
            className="post"
            key={`${commentObj.comment}-${post.$id}-${post.$createdAt}-${post.$updatedAt}-${commentObj.user}`}
          >
            <p>{commentObj.comment}</p>

            {/* <h2>{commentObj.id}</h2> */}

            <ReplyHub {...{ post, index }} />
            <CommentOptions {...{ post, index }} />

            <RenderReplies {...{ post, index }} />
          </article>
        );
      }
    });
  }
}
