import { Button } from "../components/Button";
import { SignUp } from "../hooks/Authentication/Auth";
import GetAccount from "../hooks/Authentication/GetAccount";
import { Assets } from "../middleware/Assets";
import Footer from "../components/Footer";

export default function Authentication() {
  GetAccount();

  return (
    <main className="flex justifyCenter alignCenter column" id="auth">
      <h1>Priconnect</h1>

      <div className="logoContainer flex justifyCenter alignCenter">
        <img src={Assets.Logo} alt="Priconnect Logo Vector Picture" />
      </div>

      {Button({
        text: (
          <div className="flex alignCenter justifyBetween">
            <span className="fa-brands fa-google"></span>
            <h3>Login</h3>
          </div>
        ),
        onClick: () => SignUp(),
        classNames: "button",
      })}

      <Footer />
    </main>
  );
}
