import { useParams } from "react-router";
import { useContext, useState } from "react";
import { ApiContext } from "../../../../middleware/Context";
import { Post } from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";
import RenderComments from "../Comments/renderComments/renderComments";
import PostOptions from "./PostOptions";

export default function RenderExpandedPost() {
  const { id } = useParams();
  const { posts, user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  let image = { secure_url: "", original_filename: "", created_at: "" };
  let createdAt = new Date();
  let updatedAt = new Date();

  let duplicates = "";

  const expandedPost = posts.find((post: Post) => post.$id === id) as Post;

  if (posts.length && expandedPost) {
    const postImage: string = expandedPost?.image as string;
    image = JSON.parse(postImage);

    createdAt = new Date(expandedPost?.$createdAt);
    updatedAt = new Date(expandedPost?.$updatedAt);

    if (expandedPost?.likes[0]) {
      const findDuplicate = expandedPost.likes.find((like: string) => {
        const likeObject = JSON.parse(like);

        if (likeObject.id === user.email || likeObject.id === getEmail()) {
          return likeObject;
        }
      }) as string;

      if (findDuplicate) {
        duplicates = JSON?.parse(findDuplicate)?.id;
      }
    }
  }

  const checkLikeLogic = duplicates
    ? "fa-solid fa-heart button"
    : "fa-regular fa-heart button";

  const props = {
    posts: posts,
    optionDisplay: optionDisplay,
    setOptionDisplay: (e: boolean) => setOptionDisplay(e),
    user: user,
  };

  const post = expandedPost;

  return (
    <section>
      {expandedPost ? (
        <article>
          Created at:{" "}
          {`${
            createdAt?.getMonth() + 1
          }/${createdAt?.getDate()}/${createdAt?.getFullYear()}`}
          Last Updated:{" "}
          {`${
            updatedAt?.getMonth() + 1
          }/${updatedAt?.getDate()}/${updatedAt?.getFullYear()}`}
          {expandedPost?.text}
          {image?.secure_url ? (
            <section className="imageContainer">
              <img src={image?.secure_url} alt={image?.original_filename} />
              Image created at {image?.created_at}
            </section>
          ) : (
            ""
          )}
          <PostOptions {...{ post, props, checkLikeLogic }} />
          <RenderComments {...expandedPost} />
        </article>
      ) : (
        <section>
          <h1>There is no post to render right now.</h1>
        </section>
      )}
    </section>
  );
}
