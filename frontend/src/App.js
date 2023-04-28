import { GoogleOAuthProvider} from "@react-oauth/google"
import {lazy, Suspense} from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import PrivateRoutes from "./middleware/PrivateRoutes"

function App() {

  const Home = lazy(()=>import("./pages/Home"));
  const Dashboard = lazy(()=>import("./middleware/Dashboard"));
  const Account = lazy(()=>import("./pages/Account"));
  const Post = lazy(()=>import("./pages/Post"));
  const EditPost = lazy(()=>import("./pages/EditPost"));
  const ViewPost = lazy(()=>import("./pages/ViewPost"));
  const Comics = lazy(()=>import("./pages/Comics"));
  const Comments = lazy(()=>import("./pages/Comments"));

    return(
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Suspense fallback = {<h1>Loading...</h1>}>
            <BrowserRouter>
              <Routes>
                <Route exact path = "/" element = {<Home/>}/>
                <Route path = "/dashboard" element = {<Dashboard/>}/>
                <Route path = "/viewPost" element = {<ViewPost/>}/>
                <Route path = "/comics" element = {<Comics/>}/>
                <Route path = "/comments" element = {<Comments/>}/>
                <Route element={<PrivateRoutes />}>
                  <Route path = "/editPost" element = {<EditPost/>}/>
                  <Route path = "/post" element = {<Post/>}/>
                  <Route path = "/account" element = {<Account/>}/>
                </Route>

              </Routes>
            </BrowserRouter>
            <ToastContainer />
          </Suspense>
      </GoogleOAuthProvider>
    )
}

export default App;