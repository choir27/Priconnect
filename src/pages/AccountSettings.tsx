import RenderBlockedAccounts from "../hooks/Account/renderAccount/renderBlockedAccounts";
import RenderSearchHistory from "../hooks/Account/renderAccount/renderSearchHistory";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ads from "../components/Ads";

export default function AccountSettings() {
  return (
    <main className="flex column alignCenter" id="accountSettings">
      <Header />

      <section className="flex justifyBetween">
        <article className="flex justifyBetween">
          <RenderBlockedAccounts />

          <RenderSearchHistory />
        </article>
        <Ads />
      </section>

      <Footer />
    </main>
  );
}
