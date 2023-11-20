import {Image, Post} from "../Interfaces"

export type State = {
    text: string,
    image: Image,
    posts: Post[]
};

export type Action = {
    setText: (e:string)=>void,
    setImage: (e:Image)=>void,
    setPosts: (e:Post[])=>void
};