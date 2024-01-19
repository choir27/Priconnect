import RenderPosts from "../../Post/RenderPosts/Posts/RenderPosts";
import { useState, useContext, useEffect } from "react";
import PaginatedButton from "../../../components/PaginatedButtons";
import { ApiContext } from "../../../middleware/Context";
import { Post } from "../../../middleware/Interfaces";
import { getEmail } from "../../../middleware/Sessions";

export function renderAccount() {
  const rowsPerPage = 4;
  const startIndex = 0;
  const [endIndex, setEndIndex] = useState<number>(4);

  const [postLength, setPostLength] = useState<number>(0);

  const { posts, user } = useContext(ApiContext);

  useEffect(() => {
    let totalPosts = 0;

    posts.forEach((post: Post) => {
      if (post.email === user.email || post.email === getEmail()) {
        totalPosts++;
      }
    });

    setPostLength(totalPosts);
  }, [postLength]);

  return (
    <section id="accountPosts">
      <RenderPosts {...{ startIndex: startIndex, endIndex: endIndex }} />
      {endIndex >= postLength ? (
        ""
      ) : (
        <PaginatedButton
          rowsPerPage={rowsPerPage}
          setEndIndex={(e: number) => setEndIndex(e)}
          endIndex={endIndex}
        />
      )}
    </section>
  );
}
