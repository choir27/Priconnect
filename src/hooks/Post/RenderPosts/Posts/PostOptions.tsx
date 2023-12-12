import { Button } from "../../../../components/Button";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import CommentHub from "../Comments/renderComments/commentHub";
import { totalLikes } from "../Likes/totalLikes";
import { addLike } from "../Likes/addLike";
import { deletePost } from "../../ManagePosts/DeletePost";
import SubscribeToAccount from "../../../Account/subscribeToAccount";
import UnSubscribeToAccount from "../../../Account/unsubscribeToAccount";
import BlockAccount from "../../../Account/blockAccount";
import {
  PostOptionsInterface,
  SubscribedPosts,
} from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";
import { ApiContext } from "../../../../middleware/Context";
import api from "../../../../middleware/Appwrite";
import { toast } from "react-toastify";

export default function PostOptions(
  props: PostOptionsInterface,
): React.JSX.Element {
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);
  const navigate = useNavigate();
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
          (subscribedPosts: SubscribedPosts) =>
            subscribedPosts.id === user.$id ||
            subscribedPosts.id === getEmail(),
        );

        setSubscriptions(findSubscriptions.subscriptions);
      } catch (err) {
        console.error(err);
        toast.error(`${err}`);
      }
    }

    GetSubscribedPosts();
  }, []);

  return (
    <section>
      <div className="flex alignItems justifyContent">
        <CommentHub
          post={props.post}
          user={props.props.user}
          navigate={navigate}
          comment={""}
        />
        <span>{props.post.likes[0] ? totalLikes(props.post.likes) : 0}</span>
        {Button({
          text: "",
          classNames: props.checkLikeLogic,
          onClick: () =>
            addLike({
              post: props.post,
              user: props.props.user,
              navigate: navigate,
            }),
        })}
        {Button({
          text: "",
          classNames: "fa-solid fa-ellipsis-vertical button",
          onClick: () => setOptionDisplay(!optionDisplay),
        })}
      </div>

      {optionDisplay ? (
        <section>
          <div>
            {props.post.email === props.props.user.email ||
            props.post.email === getEmail()
              ? Button({
                  text: "",
                  classNames: "fa-solid fa-trash-can button",
                  onClick: () => deletePost(props.post, navigate),
                })
              : ""}
            {Button({
              text: "",
              classNames: "fa-solid fa-repeat button",
              onClick: () => "",
            })}

            {props.post.email !== props.props.user.email ||
            props.post.email !== getEmail()
              ? subscriptions.includes(props.post.email)
                ? Button({
                    text: `Unsubscribe from ${props.post.email}`,
                    onClick: () =>
                      UnSubscribeToAccount(props.post.email, user.email),
                  })
                : Button({
                    text: `Subscribe To ${props.post.email}`,
                    onClick: () =>
                      SubscribeToAccount(props.post.email, user.email),
                  })
              : ""}

            {props.post.email === props.props.user.email ||
            props.post.email === getEmail()
              ? ""
              : Button({
                  text: `Block ${props.post.email}`,
                  onClick: () => BlockAccount(props.post.email, user.email),
                })}
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}
