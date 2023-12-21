import { Button } from "../../../components/Button";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ApiContext } from "../../../middleware/Context";
import { SubscribedPosts } from "../../../middleware/Interfaces";
import { getEmail } from "../../../middleware/Sessions";
import api from "../../../middleware/Appwrite";

async function changeAccountVisibility(
  subscribedPost: SubscribedPosts[],
  user: string,
) {
  try {
    const findAccount = subscribedPost.find(
      (subscribedPosts: SubscribedPosts) =>
        subscribedPosts.id === user || subscribedPosts.id == getEmail(),
    );

    if (findAccount) {
      const data = {
        private: !findAccount.private,
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

export default function TogglePrivatePublic() {
  const { subscribedPosts, user } = useContext(ApiContext);

  const findAccount = subscribedPosts.find(
    (subscribedPosts: SubscribedPosts) =>
      subscribedPosts.id === user.email || subscribedPosts.id == getEmail(),
  );

  return Button({
    text: findAccount?.private ? "Make Account Public" : "Make Account Private",
    onClick: () => changeAccountVisibility(subscribedPosts, user.email),
    classNames: "button",
  });
}
