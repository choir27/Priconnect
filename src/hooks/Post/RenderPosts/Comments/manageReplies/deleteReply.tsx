import { ReplyOptionsInterface } from "../../../../../middleware/Interfaces";
import api from "../../../../../middleware/Appwrite";
import { toast } from "react-toastify";

export async function deleteReply(props: ReplyOptionsInterface) {
  try {
    const comments = JSON.parse(props.post.comments[props.index]);

    comments.replies.splice(props.replyIndex, 1);

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
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
