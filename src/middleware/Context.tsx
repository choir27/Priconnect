import {createContext} from "react"
import { Context } from "./Zustand/Types";

export const ApiContext = createContext<Context>({
    user: {
        email: "",
        $id: "",
        name: "",
        $createdAt: ""
    },
    posts: []
});