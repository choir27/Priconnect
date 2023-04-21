import {Link} from "react-router-dom"
import {googleLogout} from "@react-oauth/google"
import axios from "axios"

const HeaderAuth = ({className}) => {

    const handleLogout = async()=>{
        try{
          googleLogout();

          await axios.delete(`http://localhost:8000/auth/google/logout/${localStorage.getItem("mongoID")}`)
            .then(res=>{
              console.log(res);
              localStorage.removeItem("id");
              if(!localStorage.getItem("id")){
                window.location.reload();
              };
            })

        }catch(err){
          console.error(err);
        }
  };

  return (
    <header className = {`flex alignItems column ${className}`}>
             <h1>For Everything Princess:Connect Re-Dive</h1>   

    <nav>
    <ul className = "flex alignItems">
            <li><Link className = "button" to = "/">Home</Link></li>

            <li><Link className = "button" to = "/dashboard">Dashboard</Link></li>

            <li><Link className = "button" to = "/account">Account</Link></li>

            <li><Link className = "button" to = "/post">Post</Link></li>

            <li><button className = "button" onClick = {()=>handleLogout()}>Logout</button></li>
        </ul>
    </nav>
    </header>
  )
}

export default HeaderAuth