import { getEmail } from "../../../../middleware/Sessions";
import {
  Post,
  PostsInterface,
  Account,
} from "../../../../middleware/Interfaces";
import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../../../middleware/Context";
import { Blocked_SubscribedPosts } from "./PostFunctions/Blocked_SubscribedPosts";
import RenderedPost from "./RenderedPost";
import { findDuplicate } from "./PostFunctions/FindDuplicate";

export default function Posts(props: PostsInterface) {
  const [posts, setPosts] = useState<Post[]>([]);

  const { subscribedPosts } = useContext(ApiContext);

  //list of accounts we are subscribed to (string[])
  //using that list, we show posts belonging to those accounts first, before showing other posts
  //make sure they are listed from most recent to most old posts

  const listOfPrivateAccounts = subscribedPosts.map((account: Account) =>
    account.private ? account.id : "",
  );

  useEffect(() => {
    Blocked_SubscribedPosts(props, (e: Post[]) => setPosts(e), subscribedPosts);
  }, [props.posts, subscribedPosts]);

  if (subscribedPosts.length && posts.length) {
    const listOfPosts = posts?.map((post: Post) => {
      const checkLikeLogic: string = findDuplicate({
        post: post,
        props: props,
        checkLikeLogic: "",
      })
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";

      if (
        window.location.href.includes("account") &&
        (post.email === props.user.email || post.email === getEmail())
      ) {
        return (
          <RenderedPost {...{ post: post, props: props, checkLikeLogic }} />
        );
      } else if (
        !window.location.href.includes("account") &&
        !listOfPrivateAccounts.includes(post.email)
      ) {
        return (
          <RenderedPost {...{ post: post, props: props, checkLikeLogic }} />
        );
      }
    });

    return (
      <section id="posts">
        {listOfPosts.slice(props.startIndex, props.endIndex)}
      </section>
    );
  } else if (!posts.length && props.posts.length) {
    const listOfPosts = props.posts?.map((post: Post) => {
      const checkLikeLogic: string = findDuplicate({
        post: post,
        props: props,
        checkLikeLogic: "",
      })
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";

      if (
        window.location.href.includes("account") &&
        (post.email === props.user.email || post.email === getEmail())
      ) {
        return (
          <RenderedPost {...{ post: post, props: props, checkLikeLogic }} />
        );
      } else if (
        !window.location.href.includes("account") &&
        !listOfPrivateAccounts.includes(post.email)
      ) {
        return (
          <RenderedPost {...{ post: post, props: props, checkLikeLogic }} />
        );
      }
    });

    return (
      <section id="posts">
        {listOfPosts.slice(props.startIndex, props.endIndex)}
      </section>
    );
  }
}
