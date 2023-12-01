import GetAccount from "../hooks/Authentication/GetAccount"
import Header from "../components/Header"
import RenderPosts from "../hooks/Post/RenderPosts/Posts/RenderPosts"
import {useStore} from "../middleware/Zustand/States"
import {State} from "../middleware/Zustand/Types"
import SearchResults from "../components/SearchResults"

export default function Dashboard(){

    GetAccount();

    const searchValue = useStore((state: State)=>state.searchValue);

    return(
        <main>
            <Header/>
            <h1>Dashboard</h1>

           {searchValue ? <SearchResults/> : <RenderPosts/>}
        </main>
    )
}