import api from "../../../middleware/Appwrite";
import { Permission, Role } from "appwrite";
import { Account } from "../../../middleware/Interfaces";
import { toast } from "react-toastify";

export default async function SubscribeToAccount(id: string, email: string) {
  try {
    const account = await api.getAccount();

    const subscriptions = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    const findAccount = subscriptions.documents.find(
      (account: Account) => account.id === email,
    );

    const findPostAccount = subscriptions.documents.find(
      (account: Account) => id === account.id,
    );

    if (findPostAccount) {
      const data = {
        numOfSubscriptions: (findPostAccount.numOfSubscriptions += 1),
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        findPostAccount.$id,
        data,
      );
    } else {
      const data = {
        id: id,
        subscriptions: [],
        blocked: [],
        numOfSubscriptions: 1,
        numOfPosts: 0,
        numOfLikes: 0,
      };

      await api.createDocument(
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        data,
      );
    }

    if (findAccount) {
      if (findAccount.subscriptions.includes(id)) {
        return;
      }

      const array = findAccount.subscriptions;

      array.push(id);

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
    } else {
      const data = {
        id: email,
        subscriptions: [id],
      };

      await api.createDocument(
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        data,
        [
          Permission.read(Role.user(account.$id)),
          Permission.update(Role.user(account.$id)),
          Permission.delete(Role.user(account.$id)),
        ],
      );
    }

    window.location.reload();
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
