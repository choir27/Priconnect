import {useEffect} from "react"
import api from "../../middleware/Appwrite"
import {setEmail} from "../../middleware/Sessions"

export default function GetAccount(){
    
    useEffect(()=>{
        async function GetAccount(){
            try{
                const account = await api.getAccount();

                console.log(account)
                    
                if(account){
                    setEmail(account.email);
                }

            }catch(err){
                console.error(err);
            }
        };

        GetAccount();

    },[]);
    
}