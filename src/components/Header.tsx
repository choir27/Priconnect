import {Button} from "../components/Button"
import {SignOut} from "../hooks/Authentication/Auth"
import {useNavigate} from "react-router-dom"
import {ApiContext} from "../middleware/Context"
import {useContext} from "react"
import CreatePostHub from "./CreatePostHub"
import {getEmail} from "../middleware/Sessions"

export default function Header(){

    const {user} = useContext(ApiContext);

    const navigate:(e:string) => void = useNavigate() as (e:string) => void;

    return(
        <header>
            <nav>
                {user.email || getEmail() ? <a className = "button" href = "/dashboard  ">Home</a> : ""}
                {user.email || getEmail() ? <a className = "button" href = "/account">Account</a> : ""}
                {user.email || getEmail() ? Button({text: "Logout", classNames: "button", onClick: ()=> SignOut(navigate)}) : ""}
            </nav>

            {user.email || getEmail() ? <CreatePostHub/> : ""}

        </header>
    )
}