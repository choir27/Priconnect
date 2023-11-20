import {Outlet, Navigate} from "react-router-dom"
import {useContext} from "react"
import {UserContext} from "../../middleware/Context"
import {User} from "../../middleware/Interfaces"
import {getEmail} from "../../middleware/Sessions"

export default function PrivateRoutes(){

    const user = useContext(UserContext) as User;

    return(
        user?.email || getEmail() === user?.email ? <Outlet/> : <Navigate to = "/"/>
    )
}
