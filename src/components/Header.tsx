import { Button } from "../components/Button";
import { SignOut } from "../hooks/Authentication/Auth";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../middleware/Context";
import { useContext, useState } from "react";
import { useStore } from "../middleware/Zustand/States";
import { Action } from "../middleware/Zustand/Types";
import { getEmail } from "../middleware/Sessions";
import SearchBar from "./Search/SearchBar";
import { Assets } from "../middleware/Assets";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(ApiContext);
  const setDisplay = useStore((action: Action) => action.setDisplay);
  const [toggleMenu, setToggleMenu] = useState<string>("hidden");

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

      <div className="hidden bars">
        {Button({
          text: "",
          classNames: `${
            toggleMenu == "hidden"
              ? "button2 fa-solid fa-bars"
              : "button2 fa-solid fa-xmark"
          }`,
          onClick: () => {
            toggleMenu == "hidden"
              ? setToggleMenu("show")
              : setToggleMenu("hidden");
          },
        })}
      </div>

      <div className="create">
        {Button({
          text: "",
          classNames: "button fa-solid fa-plus",
          onClick: () => setDisplay(true),
        })}
      </div>

      <section className={`nav flex ${toggleMenu}`}>
        {user.email || getEmail() ? <SearchBar /> : ""}

        <nav className="flex alignEnd justifyBetween">
          <a
            className={
              window.location.href.includes("dashboard") ? "active" : ""
            }
            href="/dashboard  "
          >
            Home
          </a>

          <a
            className={
              window.location.href.includes("account") &&
              !window.location.href.includes("settings")
                ? "active"
                : ""
            }
            href="/account"
          >
            Account
          </a>

          <a
            className={
              window.location.href.includes("settings") ? "active" : ""
            }
            href="/account/settings"
          >
            Settings
          </a>

          {Button({
            text: "Logout",
            onClick: () => SignOut(navigate),
          })}
        </nav>

        <div className="createMobile">
          {Button({
            text: "",
            classNames: "button2 fa-solid fa-plus",
            onClick: () => setDisplay(true),
          })}
        </div>
      </section>
    </header>
  );
}
