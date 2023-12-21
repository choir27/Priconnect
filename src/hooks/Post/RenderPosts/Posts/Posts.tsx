import { getEmail } from "../../../../middleware/Sessions";
import { setPostId } from "../../../../middleware/Sessions";
import {
  Post,
  PostsInterface,
  SubscribedPosts,
} from "../../../../middleware/Interfaces";
import { useNavigate } from "react-router";
import PostOptions from "./PostOptions";
import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../../../middleware/Context";
import { toast } from "react-toastify";

export default function Posts(props: PostsInterface) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  const { subscribedPosts } = useContext(ApiContext);

  //list of accounts we are subscribed to (string[])
  //using that list, we show posts belonging to those accounts first, before showing other posts
  //make sure they are listed from most recent to most old posts

  const listOfPrivateAccounts = subscribedPosts.map(
    (SubscribedPosts: SubscribedPosts) =>
      SubscribedPosts.private ? SubscribedPosts.id : "",
  );

  useEffect(() => {
    async function GetSubscribedPosts() {
      try {
        if (props.posts.length) {
          const findSubscriptions = subscribedPosts.find(
            (subscribedPosts: SubscribedPosts) =>
              subscribedPosts.id === props.user.$id ||
              subscribedPosts.id === getEmail(),
          );

          const findCurrentUserBlocked = subscribedPosts.find(
            (subscribedPosts: SubscribedPosts) =>
              subscribedPosts.blocked.includes(props.user.$id) ||
              subscribedPosts.blocked.includes(getEmail() as string),
          );

          const array: Post[] = [];

          if (
            findSubscriptions?.subscriptions &&
            !findSubscriptions.blocked.length &&
            !findCurrentUserBlocked
          ) {
            props.posts.forEach((post: Post) => {
              if (
                findSubscriptions.subscriptions.includes(post.email) ||
                post.email === getEmail() ||
                post.email === props.user.email
              ) {
                array.push(post);
              }
            });

            props.posts.forEach((post: Post) => {
              if (
                !findSubscriptions.subscriptions.includes(post.email) &&
                post.email !== (props.user.email || getEmail()) &&
                !listOfPrivateAccounts.includes(post.email)
              ) {
                array.push(post);
              }
            });

            setPosts(array);
          } else if (
            findSubscriptions?.blocked.length &&
            !findCurrentUserBlocked
          ) {
            props.posts.forEach((post: Post) => {
              if (
                findSubscriptions.subscriptions.includes(post.email) ||
                (post.email === (props.user.email || getEmail()) &&
                  !findSubscriptions.blocked.includes(post.email))
              ) {
                array.push(post);
              }
            });

            props.posts.forEach((post: Post) => {
              if (
                !findSubscriptions.subscriptions.includes(post.email) &&
                post.email !== (props.user.email || getEmail()) &&
                !findSubscriptions.blocked.includes(post.email)
              ) {
                array.push(post);
              }
            });

            setPosts(array);
          } else if (findCurrentUserBlocked) {
            props.posts.forEach((post: Post) => {
              if (!findCurrentUserBlocked.id.includes(post.email)) {
                array.push(post);
              }
            });

            setPosts(array);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(`${err}`);
      }
    }

    GetSubscribedPosts();
  }, [props.posts, subscribedPosts]);

  if (subscribedPosts.length && posts.length) {
    const listOfPosts = posts?.map((post: Post) => {
      const image = JSON?.parse(post?.image);

      let duplicates = "";

      if (post?.likes[0]) {
        const findDuplicate = post?.likes?.find((like: string) => {
          const likeObject = JSON?.parse(like);

          if (
            likeObject?.id === props?.user?.email ||
            likeObject?.id === getEmail()
          ) {
            return likeObject;
          }
        }) as string;

        if (findDuplicate) {
          duplicates = JSON?.parse(findDuplicate)?.id;
        }
      }

      const checkLikeLogic: string = duplicates
        ? "fa-solid fa-heart button"
        : "fa-regular fa-heart button";

      if (
        window.location.href.includes("account") &&
        (post.email === props.user.email || post.email === getEmail())
      ) {
        return (
          <section key={post.$id}>
            <article
              className="button"
              onClick={() => {
                setPostId(post.$id);
                navigate(`/${post.$id}`);
              }}
            >
              <p>{post.text}</p>
              <div className="imageContainer">
                <img src={image.secure_url} alt={image.original_name} />
              </div>
            </article>
            <PostOptions {...{ post, props, checkLikeLogic }} />
          </section>
        );
      } else if (
        !window.location.href.includes("account") &&
        !listOfPrivateAccounts.includes(post.email)
      ) {
        return (
          <section key={post.$id}>
            <article
              className="button"
              onClick={() => {
                setPostId(post.$id);
                navigate(`/${post.$id}`);
              }}
            >
              <p>{post.text}</p>
              <div className="imageContainer">
                <img src={image.secure_url} alt={image.original_name} />
              </div>
            </article>
            <PostOptions {...{ post, props, checkLikeLogic }} />
          </section>
        );
      }
    });

    return <section>{listOfPosts}</section>;
  } else if (!posts.length && props.posts.length) {
    const listOfPosts = props.posts?.map((post: Post) => {
      const image = JSON?.parse(post?.image);

      let duplicates = "";

      if (post?.likes[0]) {
        const findDuplicate = post?.likes?.find((like: string) => {
          const likeObject = JSON?.parse(like);

          if (
            likeObject?.id === props?.user?.email ||
            likeObject?.id === getEmail()
          ) {
            return likeObject;
          }
        }) as string;

        if (findDuplicate) {
          duplicates = JSON?.parse(findDuplicate)?.id;
        }
      }

      const checkLikeLogic: string = duplicates
        ? "fa-solid fa-heart button"
        : "fa-regular fa-heart button";

      if (
        window.location.href.includes("account") &&
        (post.email === props.user.email || post.email === getEmail())
      ) {
        return (
          <section key={post.$id}>
            <article
              className="button"
              onClick={() => {
                setPostId(post.$id);
                navigate(`/${post.$id}`);
              }}
            >
              <p>{post.text}</p>
              <div className="imageContainer">
                <img src={image.secure_url} alt={image.original_name} />
              </div>
            </article>
            <PostOptions {...{ post, props, checkLikeLogic }} />
          </section>
        );
      } else if (
        !window.location.href.includes("account") &&
        !listOfPrivateAccounts.includes(post.email)
      ) {
        listOfPrivateAccounts.includes(post.email);
        return (
          <section key={post.$id}>
            <article
              className="button"
              onClick={() => {
                setPostId(post.$id);
                navigate(`/${post.$id}`);
              }}
            >
              <p>{post.text}</p>
              <div className="imageContainer">
                <img src={image.secure_url} alt={image.original_name} />
              </div>
            </article>
            <PostOptions {...{ post, props, checkLikeLogic }} />
          </section>
        );
      }
    });

    return <section>{listOfPosts}</section>;
  }
}
