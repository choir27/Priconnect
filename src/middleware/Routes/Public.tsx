import {Outlet, Navigate} from "react-router-dom"
import {useContext} from "react"
import {ApiContext} from "../../middleware/Context"
import {getEmail} from "../../middleware/Sessions"

export default function PublicRoutes(){
    const {user} = useContext(ApiContext);

    return(
       getEmail() || user?.email || user?.email === getEmail() ? <Navigate to = "/dashboard"/> : <Outlet/>
    )
}