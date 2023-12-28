import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ads from "../components/Ads";
import RenderExpandedPost from "../hooks/Post/RenderPosts/Posts/RenderExpandedPost";

export default function ExpandedPost() {
  GetAccount();

  return (
    <main>
      <Header />
      <h1>Post</h1>

      <RenderExpandedPost />

      <Ads />

      <Footer />
    </main>
  );
}
