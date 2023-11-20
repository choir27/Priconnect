import api from "../../middleware/Appwrite"
import {Permission, Role} from "appwrite"
import {useStore} from "../../middleware/States"
import {State} from "../../middleware/Types"

interface CreatePostInterface{
    text: string
}

export default async function CreatePost(props: CreatePostInterface){

    try{
        // const account = await api.getAccount();
        
        const data = {
            "text": props.text
        };

        console.log(data);

        // await api.createDocument(import.meta.env.VITE_REACT_APP_DATABASE_ID, import.meta.env.VITE_REACT_APP_COLLECTION_ID, data, [Permission.read(Role.user(account.$id)), Permission.create(Role.user(account.$id)), Permission.update(Role.user(account.$id)), Permission.delete(Role.user(account.$id))]);

    }catch(err){
        console.error(err);
    }
}