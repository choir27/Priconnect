import {CommentOptionsInterface} from "../../../../../middleware/Interfaces"
import api from "../../../../../middleware/Appwrite"

export async function deleteComment(props: CommentOptionsInterface){
    try{
    
        const array = props.post.comments;
        array.splice(props.index, 1);

        const data = {
            comments: array
        };

        await api.updateDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, props.post.$id, data);

        window.location.reload();
        
    }catch(err){
        console.error(err);
    }
}