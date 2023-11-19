import {
  QueryClientProvider,
  QueryClient
} from "@tanstack/react-query"
import {BrowserRouter} from "react-router-dom"
import {Routes, Route} from "react-router"
import { GoogleOAuthProvider } from "@react-oauth/google";
import Authentication from "./pages/Authentication"
import Dashboard from "./pages/Dashboard"

//create a client
const queryClient = new QueryClient();

//create routes
export default function App(){
  return(
    <GoogleOAuthProvider clientId = {import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID as string}>
      <QueryClientProvider client = {queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Authentication/>}/>
            <Route path = "/dashboard" element = {<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}