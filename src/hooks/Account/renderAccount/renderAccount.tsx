import RenderPosts from "../../Post/RenderPosts/Posts/RenderPosts";
import RenderAccountComment from "./renderAccountComments";
import { useState } from "react";
import PaginatedButton from "../../../components/PaginatedButtons";

export function renderAccount() {
  const rowsPerPage = 4;
  const startIndex = 0;
  const [endIndex, setEndIndex] = useState(startIndex + rowsPerPage);

  return (
    <section>
      <RenderPosts startIndex={startIndex} endIndex={endIndex} />

      <PaginatedButton
        rowsPerPage={rowsPerPage}
        setEndIndex={(e: number) => setEndIndex(e)}
        endIndex={endIndex}
      />

      <RenderAccountComment />
    </section>
  );
}
