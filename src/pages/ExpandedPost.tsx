import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ads from "../components/Ads";
import RenderExpandedPost from "../hooks/Post/RenderPosts/Posts/RenderExpandedPost";
import { useStore } from "../middleware/Zustand/States";
import { State } from "../middleware/Zustand/Types";
import CreatePostHub from "../components/CreatePostHub";

export default function ExpandedPost() {
  GetAccount();

  const display = useStore((state: State) => state.display);

  return (
    <main>
      <Header />
      {display ? <CreatePostHub /> : ""}

      <section className="flex justifyBetween">
        <RenderExpandedPost />

        <Ads />
      </section>

      <Footer />
    </main>
  );
}
