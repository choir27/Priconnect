import {Link} from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"

const Header = () => {
  return (
    <nav>
        <h1>DrawConnect</h1>
        <ul>
            <li><Link to = "/">Home</Link></li>

            <li><Link to = "/Dashboard">Dashboard</Link></li>

            <li><Login/></li>

            <li><Signup/></li>
        </ul>
    </nav>
  )
}

export default Header