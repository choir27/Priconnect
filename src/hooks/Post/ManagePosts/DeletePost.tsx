import { Post, Account } from "../../../middleware/Interfaces";
import api from "../../../middleware/Appwrite";
import axios from "axios";
import { toast } from "react-toastify";

export async function deletePost(post: Post, navigate: (e: string) => void) {
  try {
    const subscribeData = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    const findAccount = subscribeData.documents?.find(
      (account: Account) => account.id === post.email,
    );

    const subscribeObj = {
      numOfPosts: (findAccount.numOfPosts -= 1),
    };

    await api.updateDocument(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
      findAccount.$id,
      subscribeObj,
    );

    if (JSON.parse(post.image).public_id) {
      const backendURL = "https://priconnect-backend.onrender.com";

      // local testing purposes const localURL = "http://localhost:8000";

      await axios.delete(
        `${backendURL}/deletePost/${JSON.parse(post.image).public_id}`,
      );

      await api.deleteDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_COLLECTION_ID,
        post.$id,
      );

      navigate("/dashboard");

      window.location.reload();
    } else {
      await api.deleteDocument(
        import.meta.env.VITE_REACT_APP_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_COLLECTION_ID,
        post.$id,
      );

      navigate("/dashboard");

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
