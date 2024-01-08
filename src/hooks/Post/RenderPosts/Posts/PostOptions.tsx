import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router";
import CommentHub from "../Comments/renderComments/commentHub";
import { totalLikes } from "../Likes/totalLikes";
import { addLike } from "../Likes/addLike";
import { deletePost } from "../../ManagePosts/DeletePost";
import { PostOptionsInterface } from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";
import { totalComment } from "../Comments/manageComments/totalComments";
import { setPostId } from "../../../../middleware/Sessions";

export default function PostOptions(
  props: PostOptionsInterface,
): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <section id="options" className="flex justifyBetween alignCenter">
      <div className="flex">
        <CommentHub
          expandedPostDomain={props.expandedPostDomain}
          post={props.post}
          user={props.props.user}
          navigate={navigate}
          comment={""}
        />
        <div className="icons">
          {totalComment(props.post.comments)}
          {Button({
            text: "",
            classNames: "fa-regular fa-comment",
            onClick: () => {
              setPostId(props.post.$id);
              navigate(`${props.expandedPostDomain}`);
            },
          })}
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
            classNames: "fa-solid fa-repeat",
            onClick: () => "",
          })}
          {props.post.email === props.props.user.email ||
          props.post.email === getEmail()
            ? Button({
                text: "",
                classNames: "fa-solid fa-trash-can",
                onClick: () => deletePost(props.post, navigate),
              })
            : ""}
        </div>
      </div>
    </section>
  );
}
