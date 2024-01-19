import CommentOptions from "./commentOptions";
import ReplyHub from "../renderReplies/replyHub";
import RenderReplies from "../renderReplies/renderReplies";
import { getEmail } from "../../../../../middleware/Sessions";
import { Button, ButtonLink } from "../../../../../components/Button";
import BlockAccount from "../../../../Account/manageAccount/blockAccount";
import SubscribeComments from "./subscribeComments";
import { useContext, useState } from "react";
import { ApiContext } from "../../../../../middleware/Context";
import { CommentElementInterface } from "../../../../../middleware/Interfaces";

export default function CommentElement(props: CommentElementInterface) {
  const { user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  const commentObj = JSON.parse(props.comment);

  return (
    <article
      className="post flex column"
      key={`${commentObj.comment}-${props.post.$id}-${props.post.$createdAt}-${props.post.email}-${props.post.$updatedAt}-${commentObj.user}`}
    >
      {Button({
        text: "",
        classNames: "fa-solid fa-ellipsis-vertical button2",
        onClick: () => setOptionDisplay(!optionDisplay),
      })}

      {optionDisplay ? (
        commentObj?.id !== user.email || commentObj?.id !== getEmail() ? (
          <div className="flex column displayOptions alignCenter justifyCenter">
            <SubscribeComments {...commentObj} />
            {commentObj?.id === user.email || commentObj?.id === getEmail()
              ? ""
              : Button({
                  text: `Block ${commentObj?.id.split("@")[0]}`,
                  classNames: "button2",
                  onClick: () => BlockAccount(commentObj?.id, user.email),
                })}
          </div>
        ) : (
          <div
            id="subscribeButtons"
            className="flex displayOptions alignCenter justifyCenter"
          >
            {ButtonLink({
              domain: "/account",
              text: "Your Account",
              onClick: () => "",
              classNames: "button2",
            })}
          </div>
        )
      ) : (
        ""
      )}

      <p>{commentObj.comment}</p>

      <ReplyHub {...{ post: props.post, index: props.index }} />
      <CommentOptions {...{ post: props.post, index: props.index }} />

      <RenderReplies {...{ post: props.post, index: props.index }} />
    </article>
  );
}
