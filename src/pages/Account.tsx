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

export default function Account() {
  const { user } = useContext(ApiContext);

  GetAccount();

  return (
    <main>
      <Header />

      <h1>{user?.name}</h1>

      <RenderAccountStatistics />

      <TogglePrivatePublic />

      <RenderBlockedAccounts />

      <RenderSearchHistory />

      {renderAccount()}

      <Ads />

      <Footer />
    </main>
  );
}
