import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";
import RenderPosts from "../hooks/Post/RenderPosts/Posts/RenderPosts";
import Ads from "../components/Ads";
import Footer from "../components/Footer";
import CreatePostHub from "../components/CreatePostHub";
import { State } from "../middleware/Zustand/Types";
import { useStore } from "../middleware/Zustand/States";
import PaginatedButton from "../components/PaginatedButtons";
import { useState, useContext } from "react";
import { ApiContext } from "../middleware/Context";

export default function Dashboard() {
  GetAccount();

  const display = useStore((state: State) => state.display);

  const { posts } = useContext(ApiContext);

  const rowsPerPage = 4;
  const startIndex = 0;
  const [endIndex, setEndIndex] = useState(4);

  return (
    <main className="flex column alignCenter">
      <Header />
      {display ? <CreatePostHub /> : ""}

      <section className="flex" id="dashboard">
        <RenderPosts {...{ startIndex: startIndex, endIndex: endIndex }} />

        <Ads />
      </section>

      {endIndex >= posts.length ? (
        ""
      ) : (
        <PaginatedButton
          rowsPerPage={rowsPerPage}
          setEndIndex={(e: number) => setEndIndex(e)}
          endIndex={endIndex}
        />
      )}

      <Footer {...{ id: "footer" }} />
    </main>
  );
}
