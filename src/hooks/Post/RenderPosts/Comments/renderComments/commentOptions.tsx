import { Button } from "../../../../../components/Button";
import { addCommentLike } from "../manageComments/addCommentLike";
import {
  CommentOptionsInterface,
  CommentLike,
} from "../../../../../middleware/Interfaces";
import { useContext } from "react";
import { ApiContext } from "../../../../../middleware/Context";
import { getEmail } from "../../../../../middleware/Sessions";
import { deleteComment } from "../manageComments/deleteComment";
import { totalCommentAmount } from "../manageComments/totalComments";

export default function CommentOptions(props: CommentOptionsInterface) {
  const { user } = useContext(ApiContext);

  let duplicates = "";

  let commentId = "";

  if (props.post) {
    const comment = JSON.parse(props?.post?.comments[props?.index]);
    commentId = comment.id;

    if (comment?.likes[0]) {
      const findDuplicate = comment?.likes?.find(
        (commentLike: CommentLike) =>
          commentLike?.id === user.email || commentLike?.id === getEmail(),
      );

      if (findDuplicate) {
        duplicates = findDuplicate?.id;
      }
    }

    const checkLikeLogic: string = duplicates
      ? "fa-solid fa-heart button"
      : "fa-regular fa-heart button";

    return (
      <section id="options" className="flex alignCenter">
        <span>{comment?.likes?.length}</span>
        {Button({
          text: "",
          classNames: checkLikeLogic,
          onClick: () => addCommentLike(props.post, props.index, user),
        })}
        {totalCommentAmount(comment.replies)}

        {Button({
          text: "",
          classNames: "fa-regular fa-comment",
          onClick: () => "",
        })}

        {commentId === user.email || commentId === getEmail()
          ? Button({
              text: "",
              classNames: "fa-solid fa-trash-can button",
              onClick: () =>
                deleteComment({ post: props.post, index: props.index }),
            })
          : ""}
      </section>
    );
  }
}
