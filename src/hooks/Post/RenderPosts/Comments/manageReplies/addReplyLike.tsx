import {
  ReplyOptionsInterface,
  User,
  CommentLike,
} from "../../../../../middleware/Interfaces";
import { getEmail } from "../../../../../middleware/Sessions";
import api from "../../../../../middleware/Appwrite";
import { toast } from "react-toastify";

export async function addReplyLike(props: ReplyOptionsInterface, user: User) {
  try {
    if (
      props &&
      props.post &&
      props.post.comments &&
      props.post.comments[props.index]
    ) {
      const comments = JSON.parse(props.post.comments[props.index]);

      let likes = { id: "" };

      if (user.email) {
        likes = { id: user.email };
      } else {
        likes = { id: getEmail() as string };
      }

      if (comments.replies[props.replyIndex].likes[0]) {
        const findDuplicate = comments?.replies[props.replyIndex].likes?.find(
          (commentLike: CommentLike) => {
            //checks against both user email from Appwrite getAccount() and sessionStorage email value
            if (
              commentLike?.id === user.email ||
              commentLike?.id === getEmail()
            ) {
              return commentLike;
            }
          },
        ) as CommentLike;

        if (findDuplicate?.id) {
          return;
        } else {
          const array = comments.replies[props.replyIndex].likes;
          array.push(likes);

          comments.replies[props.replyIndex].likes = array;

          props.post.comments[props.index] = JSON.stringify(comments);

          const data = {
            comments: props.post.comments,
          };

          await api.updateDocument(
            import.meta.env.VITE_REACT_APP_DATABASE_ID,
            import.meta.env.VITE_REACT_APP_COLLECTION_ID,
            props.post.$id,
            data,
          );

          window.location.reload();
        }
      } else {
        const array = comments.replies[props.replyIndex].likes;
        array.push(likes);

        comments.replies[props.replyIndex].likes = array;

        props.post.comments[props.index] = JSON.stringify(comments);

        const data = {
          comments: props.post.comments,
        };

        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_COLLECTION_ID,
          props.post.$id,
          data,
        );

        window.location.reload();
      }
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
