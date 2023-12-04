import {getEmail} from "../../../../middleware/Sessions"
import {setPostId} from "../../../../middleware/Sessions"
import {Post, PostsInterface, SubscribedPosts, User} from "../../../../middleware/Interfaces"
import {useNavigate} from "react-router"
import PostOptions from "./PostOptions"
import api from "../../../../middleware/Appwrite"
import {useState, useEffect} from "react"

export default function Posts(props: PostsInterface){

    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);

    //list of accounts we are subscribed to (string[])
    //using that list, we show posts belonging to those accounts first, before showing other posts
    //make sure they are listed from most recent to most old posts

    useEffect(()=>{

        async function GetSubscribedPosts(){   
            try{
                const data = await api.listDocuments(import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID, import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID);
        
                const findSubscriptions = data.documents.find((subscribedPosts: SubscribedPosts)=>subscribedPosts.id === props.user.$id || subscribedPosts.id === getEmail());
                    
                const array: Post[] = [];

                props?.posts.forEach((post:Post)=>{
                    if(findSubscriptions.subscriptions.includes(post.email) || post.email === getEmail() || post.email === props.user.email){
                        array.push(post);
                    }
                });
    
                props?.posts.forEach((post:Post)=>{
                    if(!findSubscriptions   .subscriptions.includes(post.email) && post.email !== (props.user.email || getEmail())){
                        array.push(post);
                    };
                });
    
                setPosts(array);

            }catch(err){
                console.error(err);
            }
        }

        if(props.posts.length){
            GetSubscribedPosts();
        }
     
    },[props.posts]);
    
    if(posts.length){

        const listOfPosts = posts?.map((post: Post)=>{

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
    
    
            if(window.location.href.includes("account") && (post.email === props.user.email || post.email === getEmail())){
                return(
                    <section key = {post.$id} >
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
            }else if(!window.location.href.includes("account")){
                return(
                    <section key =  {post.$id} >
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
            };
    
            });
        
            return(
                <section>
                    {listOfPosts.length ? listOfPosts : <h1>Loading...</h1>}
                </section>
            )

    }else{
        
        const listOfPosts = props.posts?.map((post: Post)=>{

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


        if(window.location.href.includes("account") && (post.email === props.user.email || post.email === getEmail())){
            return(
                <section key = {post.$id} >
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
        }else if(!window.location.href.includes("account")){
            return(
                <section key =  {post.$id} >
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
        };

        });

        return(
            <section>
                {listOfPosts.length ? listOfPosts : <h1>Loading...</h1>}
            </section>
        )
    };

}
