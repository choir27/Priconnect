import {Link} from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"

const HomeGuest = () => {
  return (
    <header className = "flex alignItems column" id = "header">
    
             <h1 className = "flex justifyContent">Priconne</h1>
        <h2>For Everything Princess:Connect Re-Dive</h2>   

        

          <nav> 
        <ul className = "flex alignItems">
            <li><Link className = "button" to = "/">Home</Link></li>

            <li><Link className = "button" to = "/Dashboard">Dashboard</Link></li>

            <li><Link className = "button" to = "/about">About</Link></li>

            <li><Link className = "button" to = "/comics">Comics</Link></li>

            <li><Signup/></li>
            <li><Login/></li>
        </ul>
    
    </nav>

    </header>
  )
}

export default HomeGuest