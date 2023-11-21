import GetAccount from "../hooks/Authentication/GetAccount"
import Header from "../components/Header"
import {useParams} from "react-router"
import {useContext} from "react"
import {ApiContext} from "../middleware/Context"
import {Post} from "../middleware/Interfaces"
import {Button} from "../components/Button"

export default function ExpandedPost(){

    const {id} = useParams();
    const {posts} = useContext(ApiContext);

    let image = {secure_url: "", original_filename: "", created_at: ""};
    let createdAt = new Date();
    let updatedAt = new Date();

    const expandedPost = posts.find((post:Post)=>post.$id === id) as Post;

    if(posts.length && expandedPost){
    
        const postImage:string = expandedPost?.image as string;
        image = JSON.parse(postImage);

        createdAt = new Date(expandedPost?.$createdAt);
        updatedAt = new Date(expandedPost?.$updatedAt);
    }


    GetAccount();

    return(
        <main>
            <Header/>
            <h1>Post</h1>

            {expandedPost
            ?
            <section>
                Created at: {`${createdAt?.getMonth()+1}/${createdAt?.getDate()}/${createdAt?.getFullYear()}`}
                Last Updated: {`${updatedAt?.getMonth()+1}/${updatedAt?.getDate()}/${updatedAt?.getFullYear()}`}

                {expandedPost?.text}

                <img src = {image?.secure_url} alt = {image?.original_filename}/>

                Image created at {image?.created_at}

                <div>
                    <span>{expandedPost?.likes}</span>{Button({text: "", classNames: "fa-regular fa-heart button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-repeat button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-share button", onClick: ()=>""})}
                    {Button({text: "", classNames: "fa-solid fa-ellipsis-vertical button", onClick: ()=>""})}
                </div>
            </section>
            :
            <h1>Loading...</h1>
            }
          
        </main>
    )
}