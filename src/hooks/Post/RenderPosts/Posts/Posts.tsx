import {addLike} from "../Likes/addLike"
import {totalLikes} from "../Likes/totalLikes"
import CommentHub from "../Comments/commentHub"
import {getEmail} from "../../../../middleware/Sessions"
import {setPostId} from "../../../../middleware/Sessions"
import {Post, PostsInterface} from "../../../../middleware/Interfaces"
import {Button} from "../../../../components/Button"
import {useNavigate} from "react-router"

export function Posts(props: PostsInterface){

    const navigate = useNavigate();

    const listOfPosts = props.posts.map((post: Post)=>{

        const image = JSON.parse(post.image);

        let duplicates = "";

        if(post.likes[0]){

            const findDuplicate = post.likes.find((like: string)=>{
                const likeObject = JSON.parse(like);

                if(likeObject.id === props.user.email || likeObject.id === getEmail()){
                    return likeObject;
                }
            }) as string;

            duplicates = JSON.parse(findDuplicate).id;
        }

        const checkLikeLogic = duplicates ? "fa-solid fa-heart button" : "fa-regular fa-heart button"

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

                <div className = "flex alignItems justifyContent">
                    <CommentHub post = {post} user = {props.user} navigate = {navigate} comment = {""}/>
                    <span>{post.likes[0] ? totalLikes(post.likes) : 0}</span>{Button({text: "", classNames: checkLikeLogic, onClick: ()=>addLike({post: post, user:props.user, navigate: navigate})})}
                    {Button({text: "", classNames: "fa-solid fa-ellipsis-vertical button", onClick: ()=>""})}
                </div>
            </section>
        )
    });

    return(
        <section>
            {listOfPosts.length ? listOfPosts : <h1>Loading...</h1>}
        </section>
    )
}
