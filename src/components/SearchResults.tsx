import { useState, useContext } from "react";
import { ApiContext } from "../middleware/Context";
import { Post } from "../middleware/Interfaces";
import { useStore } from "../middleware/Zustand/States";
import { State } from "../middleware/Zustand/Types";
import Posts from "../hooks/Post/RenderPosts/Posts/Posts";

export default function SearchResults() {
  const { posts, user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  const searchValue = useStore((state: State) => state.searchValue);

  const searchResults: Post[] = [];

  if (searchValue) {
    posts.forEach((post: Post) => {
      if (
        post.text.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.email.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        searchResults.push(post);
      }
    });
  }

  const props = {
    posts: searchResults,
    optionDisplay: optionDisplay,
    setOptionDisplay: (e: boolean) => setOptionDisplay(e),
    user: user,
  };

  return <Posts {...props} />;
}
