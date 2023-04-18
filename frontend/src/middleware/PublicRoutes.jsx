import {Outlet, Navigate} from "react-router-dom"

const PublicRoutes = () => {

return(
  localStorage.getItem("id") ? <Navigate to = "/"/> : <Outlet/>
);

};

export default PublicRoutes