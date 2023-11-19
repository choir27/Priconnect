import {Button} from "../components/Button"
import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"
import api from "../middleware/Appwrite"
import {Client, Account, ID} from "appwrite"

export default function Authentication(){

    async function SignUp(){
        try{

            // https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/655a7df759c63bebf9ab

            // https://www.googleapis.com/oauth2/v3/userinfo
            // const userInfo = await axios.get("https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/655a7df759c63bebf9ab", {
            //     headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
            // });

            // console.log(userInfo)

            const client = new Client()
                .setEndpoint(import.meta.env.VITE_REACT_APP_ENDPOINT) // Your API Endpoint
                .setProject(import.meta.env.VITE_REACT_APP_PROJECT);     // Your project ID
            
            const account = new Account(client);

            account.createOAuth2Session('google', "http://localhost:5173/dashboard");
        
        }catch(err){
            console.error(err);
        };
    }

       
    return(
        <main>
            <h1>Authentication</h1>

            {Button({text: "Login", onClick: ()=> SignUp()})}

            <a href = "/dashboard">Dashboard</a>

        </main>
    )
}