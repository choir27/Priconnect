import { Button } from "../../../../../components/Button";
import { addComment } from "../manageComments/addComment";
import { addCommentInterface } from "../../../../../middleware/Interfaces";
import { TextBoxInput } from "../../../Inputs";
import { useStore } from "../../../../../middleware/Zustand/States";
import { Action, State } from "../../../../../middleware/Zustand/Types";

export default function CommentHub(props: addCommentInterface) {
  const setComment = useStore((action: Action) => action.setComment);

  const comment = useStore((state: State) => state.comment);

  return (
    <section>
      <section className="comment flex alignEnd justifyCenter">
        {TextBoxInput({
          rows: 4,
          cols: 40,
          setChange: (e: string) => setComment(e),
          placeholder: "Add a Comment",
          name: "comment",
        })}
        {Button({
          text: "Post",
          classNames: "button2",
          onClick: () =>
            addComment({
              post: props.post,
              navigate: props.navigate,
              user: props.user,
              comment: comment,
            }),
        })}
      </section>
    </section>
  );
}
