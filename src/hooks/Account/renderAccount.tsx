import { Post, User } from "../../middleware/Interfaces";
import RenderPosts from "../../hooks/Post/RenderPosts/Posts/RenderPosts"
import RenderAccountComment from "./renderAccountComments";

export function renderAccount(){

        return(
            <section>
                <RenderPosts/>

                <RenderAccountComment/>
            </section>
        )
}