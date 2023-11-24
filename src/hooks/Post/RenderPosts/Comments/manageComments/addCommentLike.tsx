import {Post, User, CommentLike} from "../../../../../middleware/Interfaces"
import api from "../../../../../middleware/Appwrite"
import {getEmail} from "../../../../../middleware/Sessions"

export async function addCommentLike(post: Post, index: number, user: User){
    try{
        const comments = JSON.parse(post.comments[index]);

        let likes = {id: ""};

        if(user.email){
            likes = {id: user.email};
        }else{
            likes = {id: getEmail() as string};
        };

        if(comments.likes[0]){

            const findDuplicate = comments?.likes?.find((commentLike: CommentLike)=>{

                if(commentLike?.id === user.email || commentLike?.id === getEmail()){
                    return commentLike;
                };

            }) as CommentLike;

            if(findDuplicate?.id){
                return;
            }else{

                const array = comments.likes;
                array.push(likes);

                comments["likes"] = array;
    
                post.comments[index] = (JSON.stringify(comments));
    
                const data = {
                    comments: post.comments
                };
    
                await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, post.$id, data);
    
                window.location.reload();
            }

        }else{

            comments["likes"] = [likes];

            post.comments[index] = (JSON.stringify(comments));

            const data = {
                comments: post.comments
            };

            await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, post.$id, data);

            window.location.reload();
        }


    }catch(err){
        console.error(err);
    }
}