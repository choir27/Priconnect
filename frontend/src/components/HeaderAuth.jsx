import {Link} from "react-router-dom"
import {handleLogout} from "../hooks/HeaderAuth"
import {useState} from "react"

const HeaderAuth = ({className}) => {

  const [display, setDisplay] = useState("");

  return (
    <header className = {`flex column alignItems ${className}`} id = "auth">
      <h1>For Everything Princess:Connect Re-Dive</h1>   
      <button className = "button fa-solid fa-bars" id = "menu" onClick = {()=>setDisplay("nav")}></button>
      <nav id = {display} className = "nav">
      <button className = "button fa-solid fa-xmark" id = "close" onClick = {()=>setDisplay("")}></button>

        <ul className = "flex alignItems">

          <li><Link className = "button" to = "/">Home</Link></li>

          <li><Link className = "button" to = "/dashboard">Dashboard</Link></li>

          <li><Link className = "button" to = "/account">Account</Link></li>

          <li><Link className = "button" to = "/post">Post</Link></li>

          <li><Link className = "button" to = "/comics">Comics</Link></li>

          <li><button className = "button" onClick = {()=>handleLogout()}>Logout</button></li>

        </ul>
      </nav>

    </header>
  )
}

export default HeaderAuth