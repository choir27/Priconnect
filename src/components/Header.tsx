import {Button} from "../components/Button"
import {SignOut} from "../hooks/Authentication/Auth"
import {useNavigate} from "react-router-dom"
import {ApiContext} from "../middleware/Context"
import {useContext} from "react"
import CreatePost from "./CreatePost"

export default function Header(){

    const {user} = useContext(ApiContext);

    const navigate:(e:string) => void = useNavigate() as (e:string) => void;

    return(
        <header>
            <nav>
                {user ? "" : <a className = "button" href = "/">Home</a>}
                {user ? <a className = "button" href = "/dashboard">Dashboard</a> : ""}
                {user ? Button({text: "Logout", classNames: "button", onClick: ()=> SignOut(navigate)}) : ""}
            </nav>

            {user ? <CreatePost/> : ""}

        </header>
    )
}