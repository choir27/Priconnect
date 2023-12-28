import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";
import RenderPosts from "../hooks/Post/RenderPosts/Posts/RenderPosts";
import Ads from "../components/Ads";
import Footer from "../components/Footer";
import CreatePostHub from "../components/CreatePostHub";
import {State} from "../middleware/Zustand/Types"
import {useStore} from "../middleware/Zustand/States"

export default function Dashboard() {
  GetAccount();

  const display = useStore((state:State)=>state.display);

  return (
    <main className = "flex column alignCenter">
      <Header />
      {display ? <CreatePostHub/> : ""}
      {/* <h1>Dashboard</h1>

      <RenderPosts />

      <Ads />

      <Footer /> */}
    </main>
  );
}
