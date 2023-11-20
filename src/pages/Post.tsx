import GetAccount from "../hooks/Authentication/GetAccount"
import Header from "../components/Header"

export default function Post(){

    GetAccount();

    return(
        <main>
            <Header/>
            <h1>Post</h1>
        </main>
    )
}