import {
  CommentOptionsInterface,
  Reply,
} from "../../../../../middleware/Interfaces";
import ReplyOptions from "../manageReplies/replyOptions";
import PaginatedNav from "../../../../../components/PaginatedNav";
import { useState, useContext } from "react";
import { ApiContext } from "../../../../../middleware/Context";
import { Button, ButtonLink } from "../../../../../components/Button";
import { getEmail } from "../../../../../middleware/Sessions";
import GetSubscribedPosts from "../../Posts/PostFunctions/GetSubscribedPosts";
import BlockAccount from "../../../../Account/manageAccount/blockAccount";

export default function RenderReplies(props: CommentOptionsInterface) {
  if (
    props &&
    props.post &&
    props.post.comments &&
    props.post.comments[props.index] &&
    JSON.parse(props.post.comments[props.index]).replies.length
  ) {
    const [currentPage, setCurrentPage] = useState(1);
    const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

    const { user } = useContext(ApiContext);
    const rowsPerPage = 2;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const comments = JSON.parse(props.post.comments[props.index]);

    const listOfComments = comments.replies
      .map((reply: Reply, index: number) => {
        return (
          <article
            key={`${reply.id} ${reply.comment} ${props.post.$id} ${props.post.likes} ${props.post.$createdAt} ${props.post.$updatedAt} ${props.post.text}`}
          >
            {Button({
              text: "",
              classNames: "fa-solid fa-ellipsis-vertical button2",
              onClick: () => setOptionDisplay(!optionDisplay),
            })}

            {optionDisplay ? (
              reply.id !== user.email || reply.id !== getEmail() ? (
                <div className="flex displayOptions alignCenter justifyCenter">
                  {reply.id === user.email || reply.id === getEmail()
                    ? ""
                    : Button({
                        text: `Block ${reply.id.split("@")[0]}`,
                        classNames: "button2",
                        onClick: () => BlockAccount(reply.id, user.email),
                      })}
                </div>
              ) : (
                <div
                  id="replyButtons"
                  className="flex displayOptions alignCenter justifyCenter"
                >
                  {ButtonLink({
                    domain: "/account",
                    text: "Your Account",
                    onClick: () => "",
                    classNames: "button2",
                  })}
                </div>
              )
            ) : (
              ""
            )}

            <p>{reply.comment}</p>
            <ReplyOptions
              {...{ post: props.post, index: props.index, replyIndex: index }}
            />
          </article>
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
