import { TextBoxInput } from "../hooks/Post/Inputs";
import { Button } from "./Button";
import CreatePost from "../hooks/Post/ManagePosts/CreatePost";
import { useStore } from "../middleware/Zustand/States";
import { Action, State } from "../middleware/Zustand/Types";
import ImageUpload from "../hooks/Post/UploadImage";
import { useContext } from "react";
import { ApiContext } from "../middleware/Context";

export default function CreatePostHub() {
  const setText = useStore((action: Action) => action.setText);
  const text = useStore((state: State) => state.text);
  const image = useStore((state: State) => state.image);
  const { user } = useContext(ApiContext);
  const setDisplay = useStore((action: Action) => action.setDisplay);

  return (
    <section id="create">
      <form className="flex column alignCenter justifyCenter">
        {Button({
          text: "",
          classNames: "button fa-solid fa-xmark",
          onClick: () => setDisplay(false),
        })}
        {TextBoxInput({
          setChange: (e: string) => setText(e),
          placeholder: "Add Text",
          name: "text",
          rows: 12,
          cols: 40,
        })}

        <ImageUpload />

        {Button({
          text: "Create Post",
          classNames: "button",
          onClick: () => CreatePost({ text: text, image: image }, user),
        })}

        {image.original_filename}
      </form>
    </section>
  );
}
