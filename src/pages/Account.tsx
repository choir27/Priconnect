import Header from "../components/Header";
import { ApiContext } from "../middleware/Context";
import { useContext } from "react";
import { renderAccount } from "../hooks/Account/renderAccount/renderAccount";
import RenderBlockedAccounts from "../hooks/Account/renderAccount/renderBlockedAccounts";
import RenderSearchHistory from "../hooks/Account/renderAccount/renderSearchHistory";
import RenderAccountStatistics from "../hooks/Account/renderAccount/renderAccountStatistics";
import TogglePrivatePublic from "../hooks/Account/manageAccount/togglePrivatePublic";

export default function Account() {
  const { user } = useContext(ApiContext);

  return (
    <main>
      <Header />

      <h1>{user?.name}</h1>

      <RenderAccountStatistics />

      <TogglePrivatePublic />

      <RenderBlockedAccounts />

      <RenderSearchHistory />

      {renderAccount()}
    </main>
  );
}
