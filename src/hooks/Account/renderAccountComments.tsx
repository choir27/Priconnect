import RenderComments from "../Post/RenderPosts/Comments/renderComments/renderComments";
import {Post} from "../../middleware/Interfaces"
import {useContext} from "react"
import { ApiContext } from "../../middleware/Context";

export default function RenderAccountComment(){

    const {posts} = useContext(ApiContext);

    const listOfComments = posts.map((post: Post)=><RenderComments {...post}/>);

    return listOfComments;
};