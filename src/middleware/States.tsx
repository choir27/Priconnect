import {create} from "zustand"
import {produce} from "immer"
import {State, Action} from "./Types"
import {Image} from "./Interfaces"

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
        } 
    })
)
