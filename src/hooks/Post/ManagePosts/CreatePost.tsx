import api from "../../../middleware/Appwrite";
import { Permission, Role } from "appwrite";
import { CreatePostInterface, User, SubscribedPosts } from "../../../middleware/Interfaces";
import { getEmail } from "../../../middleware/Sessions";
import { toast } from "react-toastify";

export default async function CreatePost(
  props: CreatePostInterface,
  user: User,
) {
  try {
    const account = await api.getAccount();

    const data = {
      text: props.text,
      image: JSON.stringify(props.image),
      email: user.email || getEmail(),
    };

    await api.createDocument(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_COLLECTION_ID,
      data,
      [
        Permission.read(Role.user(account.$id)),
        Permission.update(Role.user(account.$id)),
        Permission.delete(Role.user(account.$id)),
      ],
    );

    const subscribeData = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID
    );

    const findAccount = subscribeData.documents?.find(
      (subscribePosts: SubscribedPosts) =>
      subscribePosts.id === user.email,
    );

    if(findAccount){
      const subscribeObj = {
        numOfPosts: findAccount.numOfPosts += 1 
      };

      console.log(subscribeObj)
      
      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        findAccount.$id,
        subscribeObj
      );

    }else{
      const data = {
        id: user.email,
        subscriptions: [],
        blocked: [],
        numOfSubscriptions: 0,
        numOfPosts: 1,
        numOfLikes: 0 
      };
      
      await api.createDocument(
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        data,
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      );
    }


    window.location.reload();
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
