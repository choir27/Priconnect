import { useState, useContext } from "react";
import { ApiContext } from "../../../../middleware/Context";
import Posts from "./Posts";

export default function RenderPosts() {
  const { posts, user } = useContext(ApiContext);

  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  return Posts({
    posts: posts,
    optionDisplay: optionDisplay,
    setOptionDisplay: (e: boolean) => {
      setOptionDisplay(e);
    },
    user: user,
  });
}
