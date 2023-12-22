import PostOptions from "./PostOptions";
import { PostOptionsInterface } from "../../../../middleware/Interfaces";
import { setPostId } from "../../../../middleware/Sessions";
import { useNavigate } from "react-router";

export default function RenderedPost(renderedPost: PostOptionsInterface) {
  const navigate = useNavigate();

  const image = JSON?.parse(renderedPost.post?.image);

  return (
    <section key={renderedPost.post.$id}>
      <article
        className="button"
        onClick={() => {
          setPostId(renderedPost.post.$id);
          navigate(`/${renderedPost.post.$id}`);
        }}
      >
        <p>{renderedPost.post.text}</p>
        <div className="imageContainer">
          <img src={image.secure_url} alt={image.original_name} />
        </div>
      </article>
      <PostOptions
        {...{
          post: renderedPost.post,
          props: renderedPost.props,
          checkLikeLogic: renderedPost.checkLikeLogic,
        }}
      />
    </section>
  );
}
