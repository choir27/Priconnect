import { Post } from "../../../../../middleware/Interfaces";
import CommentOptions from "./commentOptions";
import ReplyHub from "../renderReplies/replyHub";
import RenderReplies from "../renderReplies/renderReplies";
import { getEmail } from "../../../../../middleware/Sessions";
import { useContext, useState } from "react";
import { ApiContext } from "../../../../../middleware/Context";
import { Button, ButtonLink } from "../../../../../components/Button";
import GetSubscribedPosts from "../../Posts/PostFunctions/GetSubscribedPosts";
import BlockAccount from "../../../../Account/manageAccount/blockAccount";

export default function RenderComments(post: Post) {
  const { user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  if (post && post.comments.length) {
    return post.comments.map((comment: string, index: number) => {
      const commentObj = JSON.parse(comment);

      if (
        (window.location.href.includes("account") &&
          (commentObj.id === user.email || commentObj.id === getEmail())) ||
        !window.location.href.includes("account")
      ) {
        return (
          <article
            className="post"
            key={`${commentObj.comment}-${post.$id}-${post.$createdAt}-${post.email}-${post.$updatedAt}-${commentObj.user}-${index}`}
          >
            {Button({
              text: "",
              classNames: "fa-solid fa-ellipsis-vertical button2",
              onClick: () => setOptionDisplay(!optionDisplay),
            })}

            {optionDisplay ? (
              post?.email !== user.email || post?.email !== getEmail() ? (
                <div className="flex displayOptions alignCenter justifyCenter">
                  <GetSubscribedPosts {...post} />

                  {post?.email === user.email || post?.email === getEmail()
                    ? ""
                    : Button({
                        text: `Block ${post?.email.split("@")[0]}`,
                        classNames: "button2",
                        onClick: () => BlockAccount(post?.email, user.email),
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

            <ReplyHub {...{ post, index }} />
            <CommentOptions {...{ post, index }} />

            <RenderReplies {...{ post, index }} />
          </article>
        );
      }
    });
  }
}
