import { ApiContext } from "../../../middleware/Context";
import { useContext, useState, useEffect } from "react";
import { SubscribedPosts } from "../../../middleware/Interfaces";
import { getEmail } from "../../../middleware/Sessions";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";
import api from "../../../middleware/Appwrite";

async function unBlock(account: string, currentAccount: SubscribedPosts) {
  try {
    const array = currentAccount.blocked;

    array.splice(array.indexOf(account), 1);

    const data = {
      blocked: array,
    };

    await api.updateDocument(
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
      currentAccount.$id,
      data,
    );

    window.location.reload();
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export default function RenderBlockedAccounts() {
  const { subscribedPosts, user } = useContext(ApiContext);

  const [currentAccount, setCurrentAccount] = useState<SubscribedPosts>();

  useEffect(() => {
    const findAccount = subscribedPosts.find(
      (subscribedPosts: SubscribedPosts) =>
        user.email || subscribedPosts.id === getEmail(),
    );
    setCurrentAccount(findAccount);
  }, [subscribedPosts]);

  const listOfBlockedAccounts = currentAccount?.blocked.map(
    (account: string) => {
      return (
        <section key={account}>
          <h3>{account}</h3>
          {Button({
            text: "Unblock",
            onClick: () => unBlock(account, currentAccount),
            classNames: "button",
          })}
        </section>
      );
    },
  );

  return (
    <section className="blocked">
      Blocked Users:
      {listOfBlockedAccounts}
    </section>
  );
}
