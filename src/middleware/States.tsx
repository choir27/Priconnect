import {create} from "zustand"
import {produce} from "immer"
import {State, Action} from "./Types"

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
        }
    })
)
