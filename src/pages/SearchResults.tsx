import SearchResults from "../components/Search/SearchResults";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ads from "../components/Ads";
import GetAccount from "../hooks/Authentication/GetAccount";

export default function SearchResultsHub() {
  GetAccount();

  return (
    <main>
      <Header />
      <section className = 'flex justifyBetween' id = 'searchResults'>
        <SearchResults />
        <Ads/>
      </section>

      <Footer />
    </main>
  );
}
