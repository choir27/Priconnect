import { Post, User, CommentLike } from "../../../../../middleware/Interfaces";
import api from "../../../../../middleware/Appwrite";
import { getEmail } from "../../../../../middleware/Sessions";
import { toast } from "react-toastify";

export async function addCommentLike(post: Post, index: number, user: User) {
  try {
    //converts comments string array element to json object of {id: emailString}
    const comments = JSON.parse(post.comments[index]);

    //defined outside of the if conditional block to redefine it
    let likes = { id: "" };

    //checks if user object exists, then redefines like object to user email
    if (user.email) {
      likes = { id: user.email };
    } else {
      //in case user object returns undefined or error occured with Appwrites getAccount function
      likes = { id: getEmail() as string };
    }

    //checks if the comment has already been liked
    if (comments.likes[0]) {
      //checks if the user currently logged in already liked this comment
      const findDuplicate = comments?.likes?.find(
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
        //stops the code from continuing if there is a duplicate account found
        return;
      } else {
        const array = comments.likes;
        array.push(likes);

        comments["likes"] = array;

        post.comments[index] = JSON.stringify(comments);

        const data = {
          comments: post.comments,
        };

        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_COLLECTION_ID,
          post.$id,
          data,
        );

        window.location.reload();
      }
    } else {
      comments["likes"] = [likes];

      post.comments[index] = JSON.stringify(comments);

      const data = {
        comments: post.comments,
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_COLLECTION_ID,
        post.$id,
        data,
      );

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
