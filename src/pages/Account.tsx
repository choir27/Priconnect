import Header from "../components/Header";
import { ApiContext } from "../middleware/Context";
import { useContext } from "react";
import { renderAccount } from "../hooks/Account/renderAccount/renderAccount";
import RenderBlockedAccounts from "../hooks/Account/renderAccount/renderBlockedAccounts";
import RenderSearchHistory from "../hooks/Account/renderAccount/renderSearchHistory";
import RenderAccountStatistics from "../hooks/Account/renderAccount/renderAccountStatistics";
import TogglePrivatePublic from "../hooks/Account/manageAccount/togglePrivatePublic";
import Footer from "../components/Footer";
import Ads from "../components/Ads";
import GetAccount from "../hooks/Authentication/GetAccount";
import { Assets } from "../middleware/Assets";
import { useStore } from "../middleware/Zustand/States";
import { State } from "../middleware/Zustand/Types";
import CreatePostHub from "../components/CreatePostHub";

export default function Account() {
  const { user } = useContext(ApiContext);
  const display = useStore((state: State) => state.display);

  GetAccount();

  return (
    <main id="account" className="flex column alignCenter">
      <Header />
      {display ? <CreatePostHub /> : ""}

      <section className="flex">
        <article>
          <section className="flex alignCenter justifyCenter hero">
            <div className="flex column">
              <h2>Welcome to Your Account, {user?.name}!</h2>
              <RenderAccountStatistics />
            </div>

            <div className="imageContainer">
              <img src={Assets.settingIcon} />
            </div>
          </section>

          {/* <TogglePrivatePublic /> */}

          {/* <RenderBlockedAccounts /> */}

          {/* <RenderSearchHistory /> */}

          {renderAccount()}
        </article>

        <Ads />
      </section>

      <Footer />
    </main>
  );
}
