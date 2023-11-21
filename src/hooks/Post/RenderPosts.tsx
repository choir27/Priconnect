import {useState, useContext} from "react"
import {Post, PostsInterface} from "../../middleware/Interfaces"
import {Button} from "../../components/Button"
import {useNavigate} from "react-router"
import {setPostId} from "../../middleware/Sessions"
import {ApiContext} from "../../middleware/Context"

function Posts(props: PostsInterface){

    const navigate = useNavigate();

    const listOfPosts = props.posts.map((post: Post)=>{

        const image = JSON.parse(post.image);

        return(
            <article className = "button" key = {image.public_id} onClick = {()=>{
                setPostId(post.$id);
                navigate(`/${post.$id}`);
            }}>
                <p>{post.text}</p>
                <div className="imageContainer">
                    <img src = {image.secure_url} alt = {image.original_name}/>
                </div>

                <div>
                    <span>{post.likes}</span>{Button({text: "", classNames: "fa-regular fa-heart button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-repeat button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-share button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-ellipsis-vertical button", onClick: ()=>""})}
                </div>
            </article>
        )
    });

    return(
        <section>
            {listOfPosts.length ? listOfPosts : <h1>Loading...</h1>}
        </section>
    )
}

export default function RenderPosts(){

    const {posts} = useContext(ApiContext);

    const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

    return Posts({posts: posts, optionDisplay, setOptionDisplay});
}