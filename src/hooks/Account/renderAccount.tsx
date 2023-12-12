import RenderPosts from "../../hooks/Post/RenderPosts/Posts/RenderPosts";
import RenderAccountComment from "./renderAccountComments";

export function renderAccount() {
  return (
    <section>
      <RenderPosts />

      <RenderAccountComment />
    </section>
  );
}
