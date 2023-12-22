import { useEffect, useContext, useState } from "react";
import api from "../../../../../middleware/Appwrite";
import { Account, Post } from "../../../../../middleware/Interfaces";
import { getEmail } from "../../../../../middleware/Sessions";
import { ApiContext } from "../../../../../middleware/Context";
import { toast } from "react-toastify";
import { Button } from "../../../../../components/Button";
import SubscribeToAccount from "../../../../Account/manageAccount/subscribeToAccount";
import UnSubscribeToAccount from "../../../../Account/manageAccount/unsubscribeToAccount";

export default function GetSubscribedPosts(post: Post): React.JSX.Element {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  const { user } = useContext(ApiContext);

  useEffect(() => {
    async function GetSubscribedPosts() {
      try {
        const data = await api.listDocuments(
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        );

        const findSubscriptions = data.documents.find(
          (subscribedPosts: Account) =>
            subscribedPosts.id === user.$id ||
            subscribedPosts.id === getEmail(),
        );

        if (findSubscriptions) {
          setSubscriptions(findSubscriptions.subscriptions);
        }
      } catch (err) {
        console.error(err);
        toast.error(`${err}`);
      }
    }

    GetSubscribedPosts();
  }, []);

  return (
    <>
      {post.email !== user.email || post.email !== getEmail()
        ? subscriptions.includes(post.email)
          ? Button({
              text: `Unsubscribe from ${post.email}`,
              onClick: () => UnSubscribeToAccount(post.email, user.email),
            })
          : Button({
              text: `Subscribe To ${post.email}`,
              onClick: () => SubscribeToAccount(post.email, user.email),
            })
        : ""}
    </>
  );
}
