import {Link} from "react-router-dom"
import Login from "./Login"
import {useState} from "react"

const HeaderGuest = ({className}) => {

  const [display, setDisplay] = useState("");

  return (
    <header className = {`flex column alignItems ${className}`} id = "header">
      <h1>Priconnect</h1>   

      {display !== "nav" ? 
      <button className = "button fa-solid fa-bars" id = "menu" onClick = {()=>setDisplay("nav")}></button>
      :
      <button className = "button fa-solid fa-xmark" id = "close" onClick = {()=>setDisplay("")}></button>
      }

      <nav id = {display} className = "nav"> 
        <ul className = "flex alignItems">

          <li><Link className = "button" to = "/">Home</Link></li>

          <li><Link className = "button" to = "/dashboard">Dashboard</Link></li>

          <li><Link className = "button" to = "/comics">Comics</Link></li>

          <li><Login/></li>
          
        </ul>
      </nav>

    </header>
  )
}

export default HeaderGuest