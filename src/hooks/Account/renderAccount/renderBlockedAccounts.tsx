import { ApiContext } from "../../../middleware/Context";
import { useContext, useState, useEffect } from "react";
import { Account } from "../../../middleware/Interfaces";
import { getEmail } from "../../../middleware/Sessions";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";
import api from "../../../middleware/Appwrite";
import PaginatedNav from "../../../components/PaginatedNav";

async function unBlock(account: string, currentAccount: Account) {
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

  const [currentAccount, setCurrentAccount] = useState<Account>();

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 2;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  useEffect(() => {
    const findAccount = subscribedPosts.find(
      (subscribedPosts: Account) =>
        user.email || subscribedPosts.id === getEmail(),
    );
    setCurrentAccount(findAccount);
  }, [subscribedPosts]);

  const listOfBlockedAccounts = currentAccount?.blocked
    .map((account: string) => {
      return (
        <section key={account} className="flex justifyBetween blockedAccount">
          <h3 className="flex alignCenter">{account.split("@")[0]}</h3>
          {Button({
            text: "Unblock",
            onClick: () => unBlock(account, currentAccount),
            classNames: "button",
          })}
        </section>
      );
    })
    .slice(startIndex, endIndex);

  return (
    <section className="blocked">
      <h2>Blocked Users:</h2>
      {listOfBlockedAccounts}

      <PaginatedNav
        {...{
          setCurrentPage,
          length: listOfBlockedAccounts?.length as number,
          rowsPerPage: rowsPerPage,
          currentPage: currentPage,
        }}
      />
    </section>
  );
}
