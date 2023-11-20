import {lazy} from "react"

export const Authentication = lazy(()=>import("./pages/Authentication"));
export const Dashboard = lazy(()=>import("./pages/Dashboard"));
export const Post = lazy(()=>import("./pages/Post"));