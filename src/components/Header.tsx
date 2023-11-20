import {Button} from "../components/Button"
import {SignOut} from "../hooks/Authentication/Auth"
import {useNavigate} from "react-router-dom"
import {UserContext} from "../middleware/Context"
import {useContext} from "react"
import {User} from "../middleware/Interfaces"
import CreatePost from "./CreatePost"

export default function Header(){

    const user = useContext(UserContext) as User;

    const navigate:(e:string) => void = useNavigate() as (e:string) => void;

    return(
        <header>
            <nav>
                {user ? "" : <a href = "/">Home</a>}
                {user ? <a href = "/dashboard">Dashboard</a> : ""}
                {user ? Button({text: "Logout", onClick: ()=> SignOut(navigate)}) : ""}
            </nav>

            {user ? <CreatePost/> : ""}

        </header>
    )
}