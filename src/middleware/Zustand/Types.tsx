import {Image, Post, User, SubscribedPosts} from "../Interfaces"

export type State = {
    text: string,
    image: Image,
    posts: Post[],
    comment: string,
    searchValue: string,
};

export type Action = {
    setText: (e:string)=>void,
    setImage: (e:Image)=>void,
    setPosts: (e:Post[])=>void,
    setComment: (e:string)=>void,
    setSearchValue: (e:string)=>void,
};

export type Context = {
    posts: Post[],
    user: User,
    subscribedPosts: SubscribedPosts[]
}

export const defaultUser = {
    email: "",
    $id: "",
    name: "",
    $createdAt: ""
}