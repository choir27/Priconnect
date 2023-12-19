import api from "../../../middleware/Appwrite";
import { Account, SubscribedPosts } from "../../../middleware/Interfaces";
import { toast } from "react-toastify";

export default async function UnSubscribeToAccount(
  postId: string,
  email: string,
) {
  try {
    const subscriptions = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    const findAccount = subscriptions.documents.find(
      (account: Account) => account.id === email,
    );

    const findUnsubscribeAccount = subscriptions.documents?.find(
      (subscribePosts: SubscribedPosts) => subscribePosts.id === postId,
    );

    const subscribeObj = {
      numOfSubscriptions: (findUnsubscribeAccount.numOfSubscriptions -= 1),
    };

    await api.updateDocument(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
      findUnsubscribeAccount.$id,
      subscribeObj,
    );

    const array = findAccount.subscriptions;

    if (array.includes(postId)) {
      array.splice(array.indexOf(postId), 1);

      const data = {
        id: email,
        subscriptions: array,
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        findAccount.$id,
        data,
      );

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
