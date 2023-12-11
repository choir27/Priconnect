import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import {
  Authentication,
  Dashboard,
  ExpandedPost,
  Account,
  SearchResults,
} from "./Routes";
import PrivateRoutes from "./middleware/Routes/Private";
import PublicRoutes from "./middleware/Routes/Public";
import { defaultUser } from "./middleware/Zustand/Types";
import { useEffect, useState, Suspense } from "react";
import { GetPosts, GetAccount, GetSubscribedPosts } from "./hooks/FetchData";
import { ApiContext } from "./middleware/Context";
import { User, Post, SubscribedPosts } from "./middleware/Interfaces";

export default function App() {
  const [user, setUser] = useState<User>(defaultUser);
  const [posts, setPosts] = useState<Post[]>([]);
  const [subscribedPosts, setSubscribedPosts] = useState<SubscribedPosts[]>([]);

  useEffect(() => {
    GetAccount((e: User) => setUser(e));
    GetPosts((e: Post[]) => setPosts(e));
    GetSubscribedPosts((e: SubscribedPosts[]) => setSubscribedPosts(e));
  }, []);

  //create routes
  return (
    <ApiContext.Provider value={{ posts, user, subscribedPosts }}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/:id" element={<ExpandedPost />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/searchResults" element={<SearchResults />} />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Authentication />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ApiContext.Provider>
  );
}
