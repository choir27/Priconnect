import { Button } from "../components/Button";
import { SignUp } from "../hooks/Authentication/Auth";
import GetAccount from "../hooks/Authentication/GetAccount";
import Header from "../components/Header";

export default function Authentication() {
  GetAccount();

  return (
    <main>
      <Header />
      <h1>Authentication</h1>

      {Button({ text: "Login", onClick: () => SignUp() })}
    </main>
  );
}
