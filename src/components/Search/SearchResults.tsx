import { useState, useContext } from "react";
import { ApiContext } from "../../middleware/Context";
import { Post } from "../../middleware/Interfaces";
import { useStore } from "../../middleware/Zustand/States";
import { State } from "../../middleware/Zustand/Types";
import Posts from "../../hooks/Post/RenderPosts/Posts/Posts";
import PaginatedButton from "../PaginatedButtons";

export default function SearchResults() {
  const { posts, user } = useContext(ApiContext);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

  const rowsPerPage = 4;
  const startIndex = 0;
  const [endIndex, setEndIndex] = useState(4);

  const searchValue = useStore((state: State) => state.searchValue);

  const searchResults: Post[] = [].slice(startIndex, endIndex);

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
    posts: searchResults.slice(startIndex, endIndex),
    optionDisplay: optionDisplay,
    setOptionDisplay: (e: boolean) => setOptionDisplay(e),
    user: user,
  };

  return searchResults.length ? (
    <section className="searchPosts">
      <Posts {...props} />

      {endIndex >= searchResults.length ? (
        ""
      ) : (
        <PaginatedButton
          rowsPerPage={rowsPerPage}
          setEndIndex={(e: number) => setEndIndex(e)}
          endIndex={endIndex}
        />
      )}
    </section>
  ) : (
    <h2 className="insert">Please Insert a Search Term</h2>
  );
}
