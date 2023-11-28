import Header from "../components/Header"
import {ApiContext} from "../middleware/Context"
import {useContext} from "react"
import {useStore} from "../middleware/Zustand/States"
import {State} from "../middleware/Zustand/Types"
import {renderAccount} from "../hooks/Account/renderAccount"

export default function Account(){

    const {user} = useContext(ApiContext);
    const posts = useStore((state: State)=>state.posts);

    return(
        <main>
            <Header/>

            <h1>{user?.name}</h1>


            {renderAccount(posts, user)}
        </main>
    )
};