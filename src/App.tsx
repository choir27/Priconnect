import {
  QueryClientProvider,
  QueryClient
} from "@tanstack/react-query"
import {BrowserRouter} from "react-router-dom"
import {Routes, Route} from "react-router"
import Authentication from "./pages/Authentication"
import Dashboard from "./pages/Dashboard"
import PrivateRoutes from "./middleware/Routes/Private"
import PublicRoutes from "./middleware/Routes/Public"
import {useEffect, useState} from "react"
import api from "./middleware/Appwrite"
import {UserContext} from "./middleware/Context"
import {User} from "./middleware/Interfaces"

export default function App(){

  //create a client
  const queryClient = new QueryClient();


  const [user,setUser] = useState<User>();
    
  useEffect(()=>{
      async function GetAccount(){
          try{
              const account = await api.getAccount();
              
              setUser(account);
          }catch(err){
              console.error(err);
          }
      }

      GetAccount();

  },[]);

  //create routes
  return(
      <QueryClientProvider client = {queryClient}>
        <UserContext.Provider value = {user}>
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
        </UserContext.Provider>
      </QueryClientProvider>
  )
}