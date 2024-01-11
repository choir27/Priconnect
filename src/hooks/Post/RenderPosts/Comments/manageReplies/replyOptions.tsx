import { Button } from "../../../../../components/Button";
import { addReplyLike } from "./addReplyLike";
import {
  ReplyOptionsInterface,
  CommentLike,
} from "../../../../../middleware/Interfaces";
import { ApiContext } from "../../../../../middleware/Context";
import { useContext } from "react";
import { getEmail } from "../../../../../middleware/Sessions";
import { deleteReply } from "../manageReplies/deleteReply";
import { totalLikes } from "../../Likes/totalLikes";

export default function ReplyOptions(props: ReplyOptionsInterface) {
  const { user } = useContext(ApiContext);

  let duplicates = "";

  let replyId = "";

  let reply = [];

  if (props.post) {
    const comment = JSON.parse(props?.post?.comments[props?.index]);

    reply = comment.replies[props.replyIndex];

    replyId = reply.id;

    if (reply.likes[0]) {
      const findDuplicate = comment?.replies[props.replyIndex].likes?.find(
        (commentLike: CommentLike) =>
          commentLike?.id === user.email || commentLike?.id === getEmail(),
      );

      if (findDuplicate) {
        duplicates = findDuplicate?.id;
      }
    }
  }

  const checkLikeLogic: string = duplicates
    ? "fa-solid fa-heart button"
    : "fa-regular fa-heart button";

  return (
    <div className="flex alignCenter replyOptions">
      <span>{totalLikes(reply.likes)}</span>
      {Button({
        text: "",
        classNames: checkLikeLogic,
        onClick: () =>
          addReplyLike(
            {
              ...{
                post: props.post,
                index: props.index,
                replyIndex: props.replyIndex,
              },
            },
            user,
          ),
      })}
      {replyId === user.email || replyId === getEmail()
        ? Button({
            text: "",
            classNames: "fa-solid fa-trash-can button",
            onClick: () =>
              deleteReply({
                post: props.post,
                index: props.index,
                replyIndex: props.replyIndex,
              }),
          })
        : ""}
    </div>
  );
}
