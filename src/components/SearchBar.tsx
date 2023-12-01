import {SearchInput} from "../hooks/Post/Inputs"
import {useStore} from "../middleware/Zustand/States"
import {Action} from "../middleware/Zustand/Types"

export default function SearchBar(){

    const setSearchValue = useStore((action: Action)=>action.setSearchValue);

    return(
        <section>
            {SearchInput({setSearchValue: (e:string)=>setSearchValue(e)})}
        </section>
    )
}