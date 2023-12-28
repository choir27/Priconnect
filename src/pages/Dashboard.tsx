import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";
import RenderPosts from "../hooks/Post/RenderPosts/Posts/RenderPosts";
import Ads from "../components/Ads";
import Footer from "../components/Footer";

export default function Dashboard() {
  GetAccount();

  return (
    <main>
      <Header />
      <h1>Dashboard</h1>

      <RenderPosts />

      <Ads />

      <Footer />
    </main>
  );
}
