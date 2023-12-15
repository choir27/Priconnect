import api from "../middleware/Appwrite";
import { Post, User, SubscribedPosts } from "../middleware/Interfaces";
import { toast } from "react-toastify";

export async function GetPosts(setPosts: (e: Post[]) => void) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_COLLECTION_ID,
    );

    data.documents.sort((a: Post, b: Post) => {
      return (
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      );
    });

    setPosts(data.documents);
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export async function GetAccount(setUser: (e: User) => void) {
  try {
    const account = await api.getAccount();

    setUser(account);
  } catch (err) {
    console.error(err);
  }
}

export async function GetSubscribedPosts(
  setSubscribedPosts: (e: SubscribedPosts[]) => void,
) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
    );

    setSubscribedPosts(data.documents);
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}