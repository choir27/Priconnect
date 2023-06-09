import {googleLogout} from "@react-oauth/google"
import axios from "axios"

const handleLogout = async()=>{
    try{
      googleLogout();

      await axios.delete(`https://priconne-backend-production.up.railway.app/auth/google/logout/${localStorage.getItem("mongoID")}`)
        .then(res=>{
          console.log(res);
          localStorage.removeItem("id");
          if(!localStorage.getItem("id")){
            window.location.reload();
          };
        });

    }catch(err){
      console.error(err);
    }
};

export {handleLogout}