import {Link} from "react-router-dom"
import {googleLogout} from "@react-oauth/google"

const HeaderAuth = () => {

    const handleLogout = async()=>{
        try{
          googleLogout();
          localStorage.removeItem("id");

          if(!localStorage.getItem("id")){
            window.location.reload();
          };

        }catch(err){
          console.error(err);
        }
  };

  return (
    <nav className = "flex">
        <h1>DrawConnect</h1>
        <ul>
            <li><Link to = "/">Home</Link></li>

            <li><Link to = "/Dashboard">Dashboard</Link></li>

            <li><Link to = "/Account">Account</Link></li>

            <li><Link to = "/Post">Post</Link></li>

            <li><button onClick = {()=>handleLogout()}>Logout</button></li>
        </ul>
    </nav>
  )
}

export default HeaderAuth