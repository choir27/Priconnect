import { useParams } from "react-router";
import { useContext, useState } from "react";
import { ApiContext } from "../../../../middleware/Context";
import { Post } from "../../../../middleware/Interfaces";
import { getEmail } from "../../../../middleware/Sessions";
import RenderComments from "../Comments/renderComments/renderComments";
import PostOptions from "./PostOptions";
import { Button } from "../../../../components/Button";
import GetSubscribedPosts from "./PostFunctions/GetSubscribedPosts";
import BlockAccount from "../../../Account/manageAccount/blockAccount";

export default function RenderExpandedPost() {
  const { id } = useParams();
  const { posts, user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  let image = { secure_url: "", original_filename: "", created_at: "" };

  let duplicates = "";

  const expandedPost = posts.find((post: Post) => post.$id === id) as Post;

  if (posts.length && expandedPost) {
    const postImage: string = expandedPost?.image as string;
    image = JSON.parse(postImage);

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
    <section id="posts">
      {expandedPost ? (
        <section id="expandedPost">
          <article className="post">
            {Button({
              text: "",
              classNames: "fa-solid fa-ellipsis-vertical button2",
              onClick: () => setOptionDisplay(!optionDisplay),
            })}
            <section className="postContainer">
              {image?.secure_url ? (
                <section className="imageContainer">
                  <img src={image?.secure_url} alt={image?.original_filename} />
                </section>
              ) : (
                ""
              )}

              {expandedPost?.text ? <p>{expandedPost?.text}</p> : ""}

              {optionDisplay ? (
                <div className="flex displayOptions alignCenter justifyCenter">
                  {expandedPost?.email !== user.email ||
                  expandedPost?.email !== getEmail() ? (
                    <GetSubscribedPosts {...expandedPost} />
                  ) : (
                    ""
                  )}

                  {expandedPost?.email === user.email ||
                  expandedPost?.email === getEmail()
                    ? ""
                    : Button({
                        text: `Block ${expandedPost?.email.split("@")[0]}`,
                        classNames: "button2",
                        onClick: () =>
                          BlockAccount(expandedPost?.email, user.email),
                      })}
                </div>
              ) : (
                ""
              )}
            </section>

            <PostOptions {...{ post, props, checkLikeLogic }} />
          </article>

          <section>
            <RenderComments {...expandedPost} />
          </section>
        </section>
      ) : (
        <section>
          <h1>There is no post to render right now.</h1>
        </section>
      )}
    </section>
  );
}
