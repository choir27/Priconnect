import {
  QueryClientProvider,
  QueryClient
} from "@tanstack/react-query"
import {BrowserRouter} from "react-router-dom"
import {Routes, Route} from "react-router"
import Authentication from "./pages/Authentication"
import Dashboard from "./pages/Dashboard"
import {PrivateRoutes, PublicRoutes} from "./middleware/Routes"

//create a client
const queryClient = new QueryClient();

//create routes
export default function App(){
  return(
      <QueryClientProvider client = {queryClient}>
        <BrowserRouter>
          <Routes>
              <Route element = {<PrivateRoutes/>}>
                <Route path = "/dashboard" element = {<Dashboard/>}/>
              </Route>
              <Route element = {<PublicRoutes/>}>
                <Route path = "/" element = {<Authentication/>}/>
              </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  )
}