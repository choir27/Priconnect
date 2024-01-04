import { Button } from "../components/Button";
import { SignOut } from "../hooks/Authentication/Auth";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../middleware/Context";
import { useContext } from "react";
import { useStore } from "../middleware/Zustand/States";
import { Action } from "../middleware/Zustand/Types";
import { getEmail } from "../middleware/Sessions";
import SearchBar from "./Search/SearchBar";
import { Assets } from "../middleware/Assets";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(ApiContext);
  const setDisplay = useStore((action: Action) => action.setDisplay);

  const navigate: (e: string) => void = useNavigate() as (e: string) => void;

  return (
    <header className="flex justifyBetween alignEnd">
      <section className="flex alignEnd">
        <div className="logoContainer">
          <img src={Assets.Logo} alt="Priconnect Logo Vector Picture" />
        </div>
        <Link to="/">
          <h1>Priconnect</h1>
        </Link>
      </section>

      {Button({
        text: "",
        classNames: "button fa-solid fa-plus",
        onClick: () => setDisplay(true),
      })}

      <section className="nav flex ">
        {user.email || getEmail() ? <SearchBar /> : ""}

        <nav className="flex alignEnd justifyBetween">
          {user.email || getEmail() ? (
            <a
              className={
                window.location.href.includes("dashboard") ? "active" : ""
              }
              href="/dashboard  "
            >
              Home
            </a>
          ) : (
            ""
          )}
          {user.email || getEmail() ? (
            <a
              className={
                window.location.href.includes("account") ? "active" : ""
              }
              href="/account"
            >
              Account
            </a>
          ) : (
            ""
          )}
          {user.email || getEmail()
            ? Button({
                text: "Logout",
                onClick: () => SignOut(navigate),
              })
            : ""}
        </nav>
      </section>
    </header>
  );
}
