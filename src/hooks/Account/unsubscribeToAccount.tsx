import api from "../../middleware/Appwrite";
import { Account } from "../../middleware/Interfaces";

export default async function UnSubscribeToAccount(id: string, email: string) {
  try {
    const subscriptions = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    const findAccount = subscriptions.documents.find(
      (account: Account) => account.id === email,
    );

    const array = findAccount.subscriptions;

    if (array.includes(id)) {
      array.splice(array.indexOf(id), 1);

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
  }
}
