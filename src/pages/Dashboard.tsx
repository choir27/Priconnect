import api from "../middleware/Appwrite"
import {useNavigate} from "react-router-dom"
import {Button} from "../components/Button"
import {useState, useEffect} from "react"
import {SignOut} from "../hooks/Auth"
import {setEmail} from "../middleware/Sessions"
import {User} from "../middleware/Interfaces"

export default function Dashboard(){

    const navigate:(e:string) => void = useNavigate() as (e:string) => void;
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
            <h1>Dashboard</h1>

            {Button({text: "Logout", onClick: ()=> SignOut(navigate)})}

        </main>
    )
}