import {
  CommentOptionsInterface,
  Reply,
} from "../../../../../middleware/Interfaces";
import PaginatedNav from "../../../../../components/PaginatedNav";
import { useState } from "react";
import RenderElement from "./renderElement";

export default function RenderReplies(props: CommentOptionsInterface) {
  if (
    props &&
    props.post &&
    props.post.comments &&
    props.post.comments[props.index] &&
    JSON.parse(props.post.comments[props.index]).replies.length
  ) {
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 2;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const comments = JSON.parse(props.post.comments[props.index]);

    const listOfComments = comments.replies
      .map((reply: Reply, index: number) => {
        return (
          <RenderElement {...{ reply: reply, props: props, index: index }} />
        );
      })
      .slice(startIndex, endIndex);

    return (
      <section id="reply" className="flex column">
        {listOfComments}

        <PaginatedNav
          {...{
            setCurrentPage,
            length: comments.replies.length,
            rowsPerPage: rowsPerPage,
            currentPage: currentPage,
          }}
        />
      </section>
    );
  }
}
