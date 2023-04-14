import { GoogleOAuthProvider} from "@react-oauth/google"
import {lazy, Suspense} from "react"
import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"

function App() {

  const Home = lazy(()=>import("./pages/Home"))

    return(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Suspense fallback = {<h1>Loading...</h1>}>
            <BrowserRouter>
              <Routes>
                <Route exact path = "/" element = {<Home/>}/>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </GoogleOAuthProvider>
    )
}

export default App;