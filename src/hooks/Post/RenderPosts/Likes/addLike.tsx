import api from "../../../../middleware/Appwrite";
import { addLikeInterface, Account } from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";
import { toast } from "react-toastify";
import { Permission, Role } from "appwrite";

export async function addLike(props: addLikeInterface) {
  try {
    const subscribeData = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    const findAccount = subscribeData.documents?.find(
      (subscribePosts: Account) => subscribePosts.id === props.post.email,
    );

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

      if (findDuplicate) {
        const likes = props.post.likes;
        likes.splice(props.post.likes.indexOf(findDuplicate), 1);

        const data = {
          likes: props.post.likes,
        };

        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_COLLECTION_ID,
          props.post.$id,
          data,
        );

        const subscribeObj = {
          numOfLikes: (findAccount.numOfLikes -= 1),
        };

        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
          findAccount.$id,
          subscribeObj,
        );

        window.location.reload();
      } else {
        if (findAccount) {
          const subscribeObj = {
            numOfLikes: (findAccount.numOfLikes += 1),
          };

          await api.updateDocument(
            import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
            import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
            findAccount.$id,
            subscribeObj,
          );
        } else {
          const data = {
            id: props.user.email,
            subscriptions: [],
            blocked: [],
            numOfSubscriptions: 0,
            numOfPosts: 0,
            numOfLikes: 1,
          };

          await api.createDocument(
            import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
            import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
            data,
            [
              Permission.read(Role.user(props.user.$id)),
              Permission.update(Role.user(props.user.$id)),
              Permission.delete(Role.user(props.user.$id)),
            ],
          );
        }

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
      if (findAccount) {
        const subscribeObj = {
          numOfLikes: (findAccount.numOfLikes += 1),
        };

        await api.updateDocument(
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
          findAccount.$id,
          subscribeObj,
        );
      } else {
        const data = {
          id: props.user.email,
          subscriptions: [],
          blocked: [],
          numOfSubscriptions: 0,
          numOfPosts: 0,
          numOfLikes: 1,
        };

        await api.createDocument(
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
          data,
          [
            Permission.read(Role.user(props.user.$id)),
            Permission.update(Role.user(props.user.$id)),
            Permission.delete(Role.user(props.user.$id)),
          ],
        );
      }

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
    toast.error(`${err}`);
  }
}
