import { ReplyElement } from "../../../../../middleware/Interfaces";
import { Button, ButtonLink } from "../../../../../components/Button";
import { useState, useContext } from "react";
import { ApiContext } from "../../../../../middleware/Context";
import { getEmail } from "../../../../../middleware/Sessions";
import BlockAccount from "../../../../Account/manageAccount/blockAccount";
import ReplyOptions from "../manageReplies/replyOptions";
import SubscribeComments from "../renderComments/subscribeComments";

export default function RenderElement(props: ReplyElement) {
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);
  const { user } = useContext(ApiContext);

  return (
    <article
      className="flex column"
      key={`${props.reply.id} ${props.reply.comment} ${props.props.post.$id} ${props.props.post.likes} ${props.props.post.$createdAt} ${props.props.post.$updatedAt} ${props.props.post.text}`}
    >
      {Button({
        text: "",
        classNames: "fa-solid fa-ellipsis-vertical button2",
        onClick: () => setOptionDisplay(!optionDisplay),
      })}

      {optionDisplay ? (
        props.reply.id !== user.email || props.reply.id !== getEmail() ? (
          <div className="flex displayOptions alignCenter justifyCenter column">
            {props.reply.id === user.email || props.reply.id === getEmail()
              ? ""
              : Button({
                  text: `Block ${props.reply.id.split("@")[0]}`,
                  classNames: "button2",
                  onClick: () => BlockAccount(props.reply.id, user.email),
                })}
            <SubscribeComments {...{ id: props.reply.id, comment: "" }} />
          </div>
        ) : (
          <div
            id="replyButtons"
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

      <p>{props.reply.comment}</p>
      <ReplyOptions
        {...{
          post: props.props.post,
          index: props.props.index,
          replyIndex: props.index,
        }}
      />
    </article>
  );
}
