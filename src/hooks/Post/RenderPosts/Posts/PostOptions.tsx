import { Button } from "../../../../components/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import CommentHub from "../Comments/renderComments/commentHub";
import { totalLikes } from "../Likes/totalLikes";
import { addLike } from "../Likes/addLike";
import { deletePost } from "../../ManagePosts/DeletePost";
import BlockAccount from "../../../Account/manageAccount/blockAccount";
import { PostOptionsInterface } from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";
import { ApiContext } from "../../../../middleware/Context";
import GetSubscribedPosts from "./PostFunctions/GetSubscribedPosts";

export default function PostOptions(
  props: PostOptionsInterface,
): React.JSX.Element {
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(ApiContext);

  return (
    <section id="options">
      <div className="flex alignCenter justifyCenter">
        <CommentHub
          expandedPostDomain={props.expandedPostDomain}
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
        {/* {Button({
          text: "",
          classNames: "fa-solid fa-ellipsis-vertical",
          onClick: () => setOptionDisplay(!optionDisplay),
        })} */}
      </div>

      {optionDisplay ? (
        <section>
          <div>
            {props.post.email === props.props.user.email ||
            props.post.email === getEmail()
              ? Button({
                  text: "",
                  classNames: "fa-solid fa-trash-can",
                  onClick: () => deletePost(props.post, navigate),
                })
              : ""}
            {Button({
              text: "",
              classNames: "fa-solid fa-repeat",
              onClick: () => "",
            })}

            <GetSubscribedPosts {...props.post} />

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
