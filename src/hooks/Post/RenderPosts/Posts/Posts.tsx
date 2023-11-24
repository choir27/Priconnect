import {getEmail} from "../../../../middleware/Sessions"
import {setPostId} from "../../../../middleware/Sessions"
import {Post, PostsInterface} from "../../../../middleware/Interfaces"
import {useNavigate} from "react-router"
import PostOptions from "./PostOptions"

export default function Posts(props: PostsInterface){

    const navigate = useNavigate();

    const listOfPosts = props?.posts?.map((post: Post)=>{

        const image = JSON?.parse(post?.image);

        let duplicates = "";

        if(post?.likes[0]){

            const findDuplicate = post?.likes?.find((like: string)=>{
                const likeObject = JSON?.parse(like);

                if(likeObject?.id === props?.user?.email || likeObject?.id === getEmail()){
                    return likeObject;
                }
            }) as string;

            if(findDuplicate){
                duplicates = JSON?.parse(findDuplicate)?.id;
            }

        }

        const checkLikeLogic: string = duplicates ? "fa-solid fa-heart button" : "fa-regular fa-heart button"

        return(
            <section key = {image.public_id} >
                <article className = "button" onClick = {()=>{
                    setPostId(post.$id);
                    navigate(`/${post.$id}`);
                }}>
                <p>{post.text}</p>
                <div className="imageContainer">
                    <img src = {image.secure_url} alt = {image.original_name}/>
                </div>

                </article>
                <PostOptions {...{post, props, checkLikeLogic}}/>
             
            </section>
        )
    });

    return(
        <section>
            {listOfPosts.length ? listOfPosts : <h1>Loading...</h1>}
        </section>
    )
}
