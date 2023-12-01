import {create} from "zustand"
import {produce} from "immer"
import {State, Action} from "./Types"
import {Image, Post} from "../Interfaces"

export const useStore = create<State & Action>(
    (set)=>({
        text: "",
        setText: (text: string) =>{
            set(
                produce(
                    (state: State)=>{
                        state.text = text;
                    }
                )
            );
        },
        image: {
            created_at: "",
            original_filename: "",
            public_id: "",
            secure_url: ""
        },
        setImage: (image: Image) => {
            set(
                produce(
                    (state: State)=>{
                        state.image = image;
                    }
                )
            );
        },
        posts: [],
        setPosts: (posts: Post[])=>{
            set(
                produce(
                    (state: State)=>{
                        state.posts = posts;
                    }
                )
            );
        },
        comment: "",
        setComment: (comment: string)=>{
            set(
                produce(
                    (state: State)=>{
                        state.comment = comment;
                    }
                )
            );
        },
        searchValue: "",
        setSearchValue: (searchValue: string)=>{
            set(
                produce(
                    (state: State)=>{
                        state.searchValue = searchValue;
                    }
                )
            );
        }
    })
)
