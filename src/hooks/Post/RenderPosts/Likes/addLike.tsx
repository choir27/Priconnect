import api from "../../../../middleware/Appwrite";
import { addLikeInterface } from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";

export async function addLike(props: addLikeInterface) {
  try {
    let likes = { id: "", likes: 0 };

    if (props.user.email) {
      likes = { id: props?.user?.email, likes: 1 };
    } else {
      likes = { id: getEmail() as string, likes: 1 };
    }

    if (props.post.likes[0]) {
      const findDuplicate = props.post.likes.find((like: string) => {
        const likeObject = JSON.parse(like);

        if (
          likeObject.id === props.user.email ||
          likeObject.id === getEmail()
        ) {
          return likeObject;
        }
      }) as string;

      if (JSON.parse(findDuplicate).id) {
        return;
      } else {
        props.post.likes.push(JSON.stringify(likes));

        const data = {
          likes: props.post.likes,
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
      const data = {
        likes: [JSON.stringify(likes)],
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
  }
}
