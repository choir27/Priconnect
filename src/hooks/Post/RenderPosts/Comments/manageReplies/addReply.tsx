import { addCommentInterface } from "../../../../../middleware/Interfaces";
import api from "../../../../../middleware/Appwrite";
import { getEmail } from "../../../../../middleware/Sessions";
import { toast } from "react-toastify";

export async function addReply(props: addCommentInterface, index: number) {
  try {
    if (props.comment && props.post) {
      const comment = JSON.parse(props.post.comments[index]);

      const replyArray = comment.replies;

      let reply = {
        id: "",
        comment: props.comment,
        likes: [],
      };

      if (props.user.email) {
        reply = { id: props?.user?.email, comment: props.comment, likes: [] };
      } else {
        reply = { id: getEmail() as string, comment: props.comment, likes: [] };
      }

      replyArray.push(reply);

      props.post.comments.splice(index, 1, JSON.stringify(comment));

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
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
