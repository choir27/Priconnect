import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";
import RenderPosts from "../hooks/Post/RenderPosts/Posts/RenderPosts";

export default function Dashboard() {
  GetAccount();

  return (
    <main>
      <Header />
      <h1>Dashboard</h1>

      <RenderPosts />
    </main>
  );
}
