import {useState, useEffect} from "react"
import {User} from "../../middleware/Interfaces"
import api from "../../middleware/Appwrite"
import {setEmail} from "../../middleware/Sessions"

export default function GetAccount(){
    
    useEffect(()=>{
        async function GetAccount(){
            try{
                const account = await api.getAccount();
                    
                if(account){
                    setEmail(account.email);
                }

            }catch(err){
                console.error(err);
            }
        }

        GetAccount();

    },[]);
    
}