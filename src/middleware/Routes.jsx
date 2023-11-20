import {Outlet, Navigate} from "react-router-dom"
import {getEmail} from "./Sessions"

export function PrivateRoutes(){
    return(
        getEmail() ? <Outlet/> : <Navigate to = "/"/>
    )
}

export function PublicRoutes(){
    return(
        getEmail() ? <Navigate to = "/dashboard"/> : <Outlet/>
    )
}