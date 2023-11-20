import GetAccount from "../hooks/Authentication/GetAccount"
import Header from "../components/Header"

export default function Dashboard(){

    GetAccount();

    return(
        <main>
            <Header/>
            <h1>Dashboard</h1>
        </main>
    )
}