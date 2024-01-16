import { useEffect, useContext, useState } from "react";
import api from "../../../../../middleware/Appwrite";
import { Account } from "../../../../../middleware/Interfaces";
import { ApiContext } from "../../../../../middleware/Context";
import { getEmail } from "../../../../../middleware/Sessions";
import { toast } from "react-toastify";
import UnSubscribeToAccount from "../../../../Account/manageAccount/unsubscribeToAccount";
import SubscribeToAccount from "../../../../Account/manageAccount/subscribeToAccount";
import { Button } from "../../../../../components/Button";

interface Comment {
  id: string;
}

export default function SubscribeComments(props: Comment) {
  const { user } = useContext(ApiContext);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

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
    <div id="subscribe">
      {props.id !== user.email || props.id !== getEmail()
        ? subscriptions.includes(props.id)
          ? Button({
              text: `Unfollow ${props.id.split("@")[0]}`,
              classNames: "button2",
              onClick: () => UnSubscribeToAccount(props.id, user.email),
            })
          : Button({
              text: `Follow ${props.id.split("@")[0]}`,
              classNames: "button2",
              onClick: () => SubscribeToAccount(props.id, user.email),
            })
        : ""}
    </div>
  );
}
