import PostOptions from "./PostOptions";
import { PostOptionsInterface } from "../../../../middleware/Interfaces";
import { setPostId } from "../../../../middleware/Sessions";
import { useNavigate } from "react-router";
import GetSubscribedPosts from "./PostFunctions/GetSubscribedPosts";
import { Button } from "../../../../components/Button";
import { getEmail } from "../../../../middleware/Sessions";
import BlockAccount from "../../../Account/manageAccount/blockAccount";
import { useContext, useState } from "react";
import { ApiContext } from "../../../../middleware/Context";

export default function RenderedPost(renderedPost: PostOptionsInterface) {
  const navigate = useNavigate();

  const image = JSON?.parse(renderedPost.post?.image);

  const { user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  return (
    <section
      key={renderedPost.post.$id}
      className={
        renderedPost.post.text.length > 100
          ? "trimmedPost flex column"
          : "post flex column"
      }
    >
      {Button({
        text: "",
        classNames: "fa-solid fa-ellipsis-vertical button2",
        onClick: () => setOptionDisplay(!optionDisplay),
      })}

      {optionDisplay ? (
        <div className="flex displayOptions alignCenter justifyCenter">
          {Button({
            text: "Expand This Post",
            classNames: "button2",
            onClick: () => {
              setPostId(renderedPost.post.$id);
              navigate(`/${renderedPost.post.$id}`);
            },
          })}

          {renderedPost.post.email !== user.email ||
          renderedPost.post.email !== getEmail() ? (
            <GetSubscribedPosts {...renderedPost.post} />
          ) : (
            ""
          )}

          {renderedPost.post.email === renderedPost.props.user.email ||
          renderedPost.post.email === getEmail()
            ? ""
            : Button({
                text: `Block ${renderedPost.post.email.split("@")[0]}`,
                classNames: "button2",
                onClick: () =>
                  BlockAccount(renderedPost.post.email, user.email),
              })}
        </div>
      ) : (
        ""
      )}

      <article
        className={image.secure_url ? "flex alignCenter justifyBetween" : ""}
      >
        <div className="imageContainer">
          <img src={image.secure_url} alt={image.original_name} />
        </div>
        <p>
          {renderedPost.post.text.length > 100
            ? renderedPost.post.text.slice(0, 200).trim() + "..."
            : renderedPost.post.text}
        </p>
      </article>

      <PostOptions
        {...{
          post: renderedPost.post,
          props: renderedPost.props,
          checkLikeLogic: renderedPost.checkLikeLogic,
          expandedPostDomain: `/${renderedPost.post.$id}`,
        }}
      />
    </section>
  );
}
