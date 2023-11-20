import {Button} from "../components/Button"
import api from "../middleware/Appwrite"
import {useState, useEffect} from "react"
import {SignUp} from "../hooks/Auth"
import {setEmail} from "../middleware/Sessions"
import {User} from "../middleware/Interfaces"

export default function Authentication(){

    const [user,setUser] = useState<User>();

    
    useEffect(()=>{
        async function GetAccount(){
            try{
                const account = await api.getAccount();
                
                setUser(account);
            }catch(err){
                console.error(err);
            }
        }

        GetAccount();

        if(user){
            setEmail(user.email);
        }
    },[])



    console.log(user);

       
    return(
        <main>
            <h1>Authentication</h1>

            {Button({text: "Login", onClick: ()=> SignUp()})}


            <a href = "/dashboard">Dashboard</a>

        </main>
    )
}