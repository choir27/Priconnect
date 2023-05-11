import {Outlet, Navigate} from "react-router-dom"

const PrivateRoutes = () => {

return(
  localStorage.getItem("id") ? <Outlet/> : <Navigate to = "/"/>
)

}

export default PrivateRoutes