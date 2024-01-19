import Header from "../components/Header";
import { ApiContext } from "../middleware/Context";
import api from "../middleware/Appwrite";
import { useContext, useState, useEffect } from "react";
import { Button, ButtonLink } from "../components/Button";
import { renderAccount } from "../hooks/Account/renderAccount/renderAccount";
import RenderAccountStatistics from "../hooks/Account/renderAccount/renderAccountStatistics";
import TogglePrivatePublic from "../hooks/Account/manageAccount/togglePrivatePublic";
import Footer from "../components/Footer";
import Ads from "../components/Ads";
import GetAccount from "../hooks/Authentication/GetAccount";
import { Assets } from "../middleware/Assets";
import { useStore } from "../middleware/Zustand/States";
import { State } from "../middleware/Zustand/Types";
import CreatePostHub from "../components/CreatePostHub";
import { clearSearchHistory } from "../hooks/Account/renderAccount/renderSearchHistory";
import { SearchHistory } from "../middleware/Interfaces";
import { getEmail } from "../middleware/Sessions";

export default function Account() {
  const { user } = useContext(ApiContext);
  const display = useStore((state: State) => state.display);

  const [settingDisplay, setSettingDisplay] = useState<boolean>(false);
  const [account, setAccount] = useState<SearchHistory>();

  useEffect(() => {
    async function GetSearchData() {
      try {
        const data = await api.listDocuments(
          import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        );

        const findAccount = data.documents?.find(
          (searchHistory: SearchHistory) =>
            searchHistory.id === user.email || searchHistory.id === getEmail(),
        );

        setAccount(findAccount);
      } catch (err) {
        console.error(err);
      }
    }

    GetSearchData();
  }, []);

  GetAccount();

  return (
    <main className="flex column alignCenter">
      <Header />
      {display ? <CreatePostHub /> : ""}

      <section className="flex justifyBetween" id="account">
        <article className="flex column">
          <section className="flex alignCenter justifyCenter hero">
            <div className="flex column">
              <h2>Welcome to Your Account</h2>
              <h2>{user?.name}</h2>
              <RenderAccountStatistics />
            </div>

            <div
              className="imageContainer"
              onClick={() => setSettingDisplay(!settingDisplay)}
            >
              <img
                src={Assets.settingIcon}
                alt="generic gear icon to reprsent the settings for the user account"
              />
            </div>
          </section>

          {settingDisplay ? (
            <section className="settings flex column">
              <TogglePrivatePublic />
              {ButtonLink({
                text: "Your Search History",
                domain: "/account/settings",
                classNames: "button2",
                key: "searchHistory",
                onClick: () => "",
              })}
              {Button({
                text: "Clear Search History",
                onClick: () => clearSearchHistory(account),
                classNames: "button2",
              })}
              {Button({
                text: "Delete Account",
                onClick: () => "",
                classNames: "button2",
              })}
            </section>
          ) : (
            ""
          )}

          {renderAccount()}
        </article>

        <Ads />
      </section>

      <Footer />
    </main>
  );
}
