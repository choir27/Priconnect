import { lazy } from "react";

export const Authentication = lazy(() => import("./pages/Authentication"));
export const Dashboard = lazy(() => import("./pages/Dashboard"));
export const ExpandedPost = lazy(() => import("./pages/ExpandedPost"));
export const Account = lazy(() => import("./pages/Account"));
export const SearchResults = lazy(() => import("./pages/SearchResults"));
