import {Client, Account} from "appwrite"
import api from "../../middleware/Appwrite"
import {setEmail} from "../../middleware/Sessions"

export async function SignUp(){
    try{
        const client = new Client()
            .setEndpoint(import.meta.env.VITE_REACT_APP_ENDPOINT) // Your API Endpoint
            .setProject(import.meta.env.VITE_REACT_APP_PROJECT);     // Your project ID
        
        const account = new Account(client);

        account.createOAuth2Session("google", "http://localhost:5173/dashboard", "http://localhost:5173", ["https://www.googleapis.com/auth/cloud-platform.read-only"]);        

    }catch(err){
        console.error(err);
    };
}

export async function SignOut(navigate: (e:string)=>void){
    try{
        await api.deleteCurrentSession();

        setEmail("");

        await navigate("/");
        window.location.reload();

    }catch(err){
        console.error(err);
    }
}