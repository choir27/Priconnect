import {Link} from "react-router-dom"
import Login from "./Login"

const HeaderGuest = ({className}) => {
  return (
    <header className = {`flex alignItems column ${className}`} id = "header">
      <h1>For Everything Princess:Connect Re-Dive</h1>   

      <nav> 
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