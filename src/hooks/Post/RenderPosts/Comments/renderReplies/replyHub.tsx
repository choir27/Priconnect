import { Button } from "../../../../../components/Button";
import { CommentOptionsInterface } from "../../../../../middleware/Interfaces";
import { TextBoxInput } from "../../../Inputs";
import { useStore } from "../../../../../middleware/Zustand/States";
import { Action, State } from "../../../../../middleware/Zustand/Types";
import { addReply } from "../manageReplies/addReply";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ApiContext } from "../../../../../middleware/Context";

export default function ReplyHub(props: CommentOptionsInterface) {
  const setReply = useStore((action: Action) => action.setComment);

  const reply = useStore((state: State) => state.comment);

  const { user } = useContext(ApiContext);
  const navigate = useNavigate();

  return (
    <section className="flex reply justifyCenter">
      {TextBoxInput({
        setChange: (e: string) => setReply(e),
        placeholder: "Add a Reply",
        name: "reply",
        rows: 3,
        cols: 35,
      })}
      {Button({
        text: "Add a Reply",
        classNames: "button2",
        onClick: () =>
          addReply(
            {
              post: props.post,
              navigate: navigate,
              user: user,
              comment: reply,
            },
            props.index,
          ),
      })}
    </section>
  );
}
