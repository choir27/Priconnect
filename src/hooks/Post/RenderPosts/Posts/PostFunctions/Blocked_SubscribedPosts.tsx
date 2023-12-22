import {
  Post,
  Account,
  PostsInterface,
} from "../../../../../middleware/Interfaces";
import { toast } from "react-toastify";
import { getEmail } from "../../../../../middleware/Sessions";

export async function Blocked_SubscribedPosts(
  props: PostsInterface,
  setPosts: (e: Post[]) => void,
  subscribedPosts: Account[],
) {
  try {
    const listOfPrivateAccounts = subscribedPosts.map((account: Account) =>
      account.private ? account.id : "",
    );

    if (props.posts.length) {
      const findSubscriptions = subscribedPosts.find(
        (account: Account) =>
          account.id === props.user.$id || account.id === getEmail(),
      );

      const findCurrentUserBlocked = subscribedPosts.find(
        (account: Account) =>
          account.blocked.includes(props.user.$id) ||
          account.blocked.includes(getEmail() as string),
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
      } else if (findSubscriptions?.blocked.length && !findCurrentUserBlocked) {
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
