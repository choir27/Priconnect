import api from "../../middleware/Appwrite"
import {useStore} from "../../middleware/Zustand/States"
import {State, Action} from "../../middleware/Zustand/Types"
import {useEffect, useState} from "react"
import {Post, PostsInterface} from "../../middleware/Interfaces"
import {Button} from "../../components/Button"
import {useNavigate} from "react-router"
import {setPostId} from "../../middleware/Sessions"

function Posts(props: PostsInterface){

    const navigate = useNavigate();

    const listOfPosts = props.posts.map((post: Post)=>{

        const image = JSON.parse(post.image);

        return(
            <article className = "button" key = {image.public_id} onClick = {()=>{

                navigate(`/post/${post.$id}`)
                }}>
                {Button({text: "", classNames: "fa-solid fa-ellipsis-vertical button", onClick: ()=>""})}
                <p>{post.text}</p>
                <div className="imageContainer">
                    <img src = {image.secure_url} alt = {image.original_name}/>
                </div>

                <div>
                    <span>{post.likes}</span>{Button({text: "", classNames: "fa-regular fa-heart button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-repeat button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-share button", onClick: ()=>""})}
                </div>
            </article>
        )
    })

    return(
        <section>
            {listOfPosts}
        </section>
    )
}

export default function RenderPosts(){

    const setPosts = useStore((action: Action)=>action.setPosts);
    const posts = useStore((state: State)=>state.posts);

    const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

    useEffect(()=>{
        async function GetPosts(){
            try{
                const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID); 

                setPosts(data.documents);
            }catch(err){
                console.error(err);
            }
        }

        GetPosts();
    },[]);

    return Posts({posts: posts, optionDisplay, setOptionDisplay});
}