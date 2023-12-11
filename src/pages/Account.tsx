import Header from "../components/Header";
import { ApiContext } from "../middleware/Context";
import { useContext } from "react";
import { renderAccount } from "../hooks/Account/renderAccount";

export default function Account() {
  const { user } = useContext(ApiContext);

  return (
    <main>
      <Header />

      <h1>{user?.name}</h1>

      {renderAccount()}
    </main>
  );
}
