import GetAccount from "../hooks/Authentication/GetAccount"
import Header from "../components/Header"
import {useParams} from "react-router"
import {useContext, useState} from "react"
import {ApiContext} from "../middleware/Context"
import {Post} from "../middleware/Interfaces"
import {Button} from "../components/Button"
import {totalLikes} from "../hooks/Post/RenderPosts/Likes/totalLikes"
import {getEmail} from "../middleware/Sessions"
import RenderComments from "../hooks/Post/RenderPosts/Comments/renderComments/renderComments"
import PostOptions from "../hooks/Post/RenderPosts/Posts/PostOptions"

export default function ExpandedPost(){

    const {id} = useParams();
    const {posts, user} = useContext(ApiContext);
    const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

    let image = {secure_url: "", original_filename: "", created_at: ""};
    let createdAt = new Date();
    let updatedAt = new Date();

    let duplicates = "";

    const expandedPost = posts.find((post:Post)=>post.$id === id) as Post;

    if(posts.length && expandedPost){
    
        const postImage:string = expandedPost?.image as string;
        image = JSON.parse(postImage);

        createdAt = new Date(expandedPost?.$createdAt);
        updatedAt = new Date(expandedPost?.$updatedAt);

        
        if(expandedPost?.likes[0]){
            const findDuplicate = expandedPost.likes.find((like: string)=>{
                const likeObject = JSON.parse(like);

                if(likeObject.id === user.email || likeObject.id === getEmail()){
                    return likeObject;
                }
            }) as string;

            if(findDuplicate){
                duplicates = JSON?.parse(findDuplicate)?.id;
            }
        }

    }

    const checkLikeLogic = duplicates ? "fa-solid fa-heart button" : "fa-regular fa-heart button"

    GetAccount();

    const props = {
        posts: posts,
        optionDisplay: optionDisplay,
        setOptionDisplay: (e:boolean)=>setOptionDisplay(e),
        user: user
    };

    const post = expandedPost;

    return(
        <main>
            <Header/>
            <h1>Post</h1>

            {expandedPost
            ?
            <section>
                Created at: {`${createdAt?.getMonth()+1}/${createdAt?.getDate()}/${createdAt?.getFullYear()}`}
                Last Updated: {`${updatedAt?.getMonth()+1}/${updatedAt?.getDate()}/${updatedAt?.getFullYear()}`}

                {expandedPost?.text}

                <img src = {image?.secure_url} alt = {image?.original_filename}/>

                Image created at {image?.created_at}

                <PostOptions {...{post, props, checkLikeLogic}}/>

                <RenderComments {...expandedPost}/>
            </section>
            :
            <h1>Loading...</h1>
            }
          
        </main>
    )
}