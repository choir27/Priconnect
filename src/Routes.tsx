import { lazy } from "react";

export const Authentication = lazy(() => import("./pages/Authentication"));
export const Dashboard = lazy(() => import("./pages/Dashboard"));
export const ExpandedPost = lazy(() => import("./pages/ExpandedPost"));
export const AccountPage = lazy(() => import("./pages/Account"));
export const SearchResults = lazy(() => import("./pages/SearchResults"));
export const AccountSettings = lazy(() => import("./pages/AccountSettings"));
