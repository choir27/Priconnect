import {addCommentInterface} from "../../../../middleware/Interfaces"
import api from "../../../../middleware/Appwrite"
import {getEmail} from "../../../../middleware/Sessions"

export async function addComment(props: addCommentInterface){
    try{

        let comment = {
            id: props.user.email,
            comment: props.comment,
            replies: []
        };

        if(props.user.email){
            comment = {id: props?.user?.email, comment: props.comment, replies: []};
        }else{
            comment = {id: getEmail() as string, comment: props.comment, replies: []};
        };


        if(props.post.comments[0]){
           props.post.comments.push(JSON.stringify(comment));

           const data = {
                comments: props.post.comments
           };

           await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, props.post.$id, data);
    
           window.location.reload();

        }else{
            const data = {
                comments: [JSON.stringify(comment)]
            };
        
            await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, props.post.$id, data);
    
            window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}