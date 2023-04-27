import {Link} from "react-router-dom"
import {handleLogout} from "../hooks/HeaderAuth"

const HeaderAuth = ({className}) => {

  return (
    <header className = {`flex alignItems column ${className}`}>
      <h1>For Everything Princess:Connect Re-Dive</h1>   
      <nav>
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