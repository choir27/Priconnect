import {useState, useContext} from "react"
import {Post, PostsInterface, addLikeInterface} from "../../middleware/Interfaces"
import {Button} from "../../components/Button"
import {useNavigate} from "react-router"
import {setPostId} from "../../middleware/Sessions"
import {ApiContext} from "../../middleware/Context"
import api from "../../middleware/Appwrite"
import {getEmail} from "../../middleware/Sessions"

async function addLike(props: addLikeInterface){
    try{

        let likes = {id: "", likes: 0};

        if(props.user.email){
            likes = {id: props?.user?.email, likes: 1};
        }else{
            likes = {id: getEmail() as string, likes: 1};
        }

        if(props.post.likes[0]){

            const findDuplicate = props.post.likes.find((like: string)=>{
                const likeObject = JSON.parse(like);

                if(likeObject.id === props.user.email || likeObject.id === getEmail()){
                    return likeObject;
                }
            }) as string;

            if(JSON.parse(findDuplicate).id){
                return;
            }else{
                props.post.likes.push(JSON.stringify(likes)); 

                const data = {
                    likes: props.post.likes
                };
        
                await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, props.post.$id, data);
        
                window.location.reload();
            }

        }else{

            const data = {
                likes: [JSON.stringify(likes)]
            };
    
            await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, props.post.$id, data);
    
            window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}

function totalLikes(likeArray: string[]){
    let sum = 0;

    likeArray.forEach((like: string)=>{
        const likeObject = JSON.parse(like);
        sum += likeObject.likes;
    })

    return sum;
};

function Posts(props: PostsInterface){

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

                <div>
                    <span>{post.likes[0] ? totalLikes(post.likes) : 0}</span>{Button({text: "", classNames: checkLikeLogic, onClick: ()=>addLike({post: post, user:props.user, navigate: navigate})})}
                    {Button({text: "", classNames: "fa-solid fa-repeat button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-share button", onClick: ()=>""})}
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

export default function RenderPosts(){

    const {posts, user} = useContext(ApiContext);

    const [optionDisplay, setOptionDisplay] = useState<boolean>(false);

    return Posts({posts: posts, optionDisplay: optionDisplay, setOptionDisplay: (e:boolean) => {setOptionDisplay(e)}, user: user});
}