import api from "../../../middleware/Appwrite"
import {Permission, Role} from "appwrite"
import {CreatePostInterface, User} from "../../../middleware/Interfaces"
import {getEmail} from "../../../middleware/Sessions"

export default async function CreatePost(props: CreatePostInterface, user: User){

    try{
        const account = await api.getAccount();
        
        const data = {
            "text": props.text,
            "image": JSON.stringify(props.image),
            "email": user.email || getEmail()
        };

        await api.createDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, data, [Permission.read(Role.user(account.$id)), Permission.update(Role.user(account.$id)), Permission.delete(Role.user(account.$id))]);

        window.location.reload();

    }catch(err){
        console.error(err);
    }
}