import {Link} from "react-router-dom"
import {googleLogout} from "@react-oauth/google"

const HomeAuth = () => {

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
    <header className = "flex alignItems column" id = "header">
    
    <h1 className = "flex justifyContent">Priconne</h1>
<h2>For Everything Princess:Connect Re-Dive</h2>   



 <nav> 
<ul className = "flex alignItems">
   <li><Link className = "button" to = "/">Home</Link></li>

   <li><Link className = "button" to = "/Dashboard">Dashboard</Link></li>

   <li><Link className = "button" to = "/comics">Comics</Link></li>

   <li><Link className = "button" to = "/Account">Account</Link></li>

    <Link to = "/" className = "button" onClick = {(e)=>{
      e.preventDefault();
      handleLogout()}}>Logout</Link>
</ul>

</nav>

</header>
  )
}

export default HomeAuth