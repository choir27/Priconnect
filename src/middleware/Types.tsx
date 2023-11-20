import {Image} from "./Interfaces"

export type State = {
    text: string,
    image: Image
};

export type Action = {
    setText: (e:string)=>void,
    setImage: (e:Image)=>void
};