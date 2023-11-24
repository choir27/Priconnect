import {Post} from "../../middleware/Interfaces"
import api from "../../middleware/Appwrite"
import axios from "axios"

export async function deletePost(post: Post){
    try{    

        const backendURL = "https://priconnect-backend.onrender.com";

        // local testing purposes const localURL = "http://localhost:8000";

        await axios.delete(`${backendURL}/deletePost/${JSON.parse(post.image).public_id}`);

        await api.deleteDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, post.$id);

        window.location.reload();
    }catch(err){
        console.error(err);
    }
}