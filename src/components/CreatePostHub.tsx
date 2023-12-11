import { TextInput } from "../hooks/Post/Inputs";
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

  return (
    <form>
      {TextInput({ setText: (e: string) => setText(e) })}

      <ImageUpload />

      {Button({
        text: "Create Post",
        classNames: "button",
        onClick: () => CreatePost({ text: text, image: image }, user),
      })}

      {image.original_filename}
    </form>
  );
}
