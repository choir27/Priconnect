import {Outlet, Navigate} from "react-router-dom"
import {useContext} from "react"
import {UserContext} from "../../middleware/Context"
import {User} from "../../middleware/Interfaces"
import {getEmail} from "../../middleware/Sessions"

export default function PublicRoutes(){
    const user = useContext(UserContext) as User;

    return(
        user?.email || user?.email === getEmail() ? <Navigate to = "/dashboard"/> : <Outlet/>
    )
}