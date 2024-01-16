import { Post } from "../../../../../middleware/Interfaces";
import CommentElement from "./commentElement";

export default function RenderComments(post: Post) {
  return post.comments.map((comment: string, index: number) => {
    return <CommentElement {...{ comment, post, index }} />;
  });
}
