import api from "../../../middleware/Appwrite";
import { Permission, Role } from "appwrite";
import { Account } from "../../../middleware/Interfaces";
import { toast } from "react-toastify";

export default async function BlockAccount(id: string, email: string) {
  try {
    const account = await api.getAccount();

    const subscriptions = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    const findAccount = subscriptions.documents.find(
      (account: Account) => account.id === email,
    );

    if (findAccount) {
      if (findAccount.blocked.includes(id)) {
        return;
      }

      const array = findAccount.blocked;

      array.push(id);

      const data = {
        id: email,
        subscriptions: findAccount.subscriptions,
        blocked: array,
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
        subscriptions: [],
        blocked: [id],
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
