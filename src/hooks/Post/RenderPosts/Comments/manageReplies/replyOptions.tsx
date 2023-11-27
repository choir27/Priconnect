import { Button } from "../../../../../components/Button"

export default function ReplyOptions(){

    // const checkLikeLogic: string = duplicates ? "fa-solid fa-heart button" : "fa-regular fa-heart button"

    return(
        <div className = "flex alignItems justifyContent">
        {Button({text: "", classNames: "fa-regular fa-heart button", onClick: ()=>""})}
        {Button({text: "", classNames: "fa-solid fa-trash-can button", onClick: ()=>""})}
    </div>
    )
}