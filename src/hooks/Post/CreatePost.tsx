import api from "../../middleware/Appwrite"
import {Permission, Role} from "appwrite"
import {Image} from "../../middleware/Interfaces"

interface CreatePostInterface{
    text: string,
    image: Image
}

export default async function CreatePost(props: CreatePostInterface){

    try{
        const account = await api.getAccount();
        
        const data = {
            "text": props.text,
            "image": JSON.stringify(props.image)
        };

        console.log(data);

        await api.createDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, data, [Permission.read(Role.user(account.$id)), Permission.update(Role.user(account.$id)), Permission.delete(Role.user(account.$id))]);

        window.location.reload();
    }catch(err){
        console.error(err);
    }
}