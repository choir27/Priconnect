import { Post } from "../../../../../middleware/Interfaces";
import CommentElement from "./commentElement";
import { getEmail } from "../../../../../middleware/Sessions";
import { useContext } from "react";
import { ApiContext } from "../../../../../middleware/Context";

export default function RenderComments(post: Post) {
  const { user } = useContext(ApiContext);

  return post.comments.map((comment: string, index: number) => {
    if (
      window.location.href.includes("account") &&
      (post.email === user.email || post.email === getEmail())
    ) {
      return <CommentElement {...{ comment, post, index }} />;
    } else {
      return <CommentElement {...{ comment, post, index }} />;
    }
  });
}
