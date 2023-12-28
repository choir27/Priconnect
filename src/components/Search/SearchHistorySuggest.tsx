import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../../middleware/Context";
import { getEmail } from "../../middleware/Sessions";
import { SearchHistory } from "../../middleware/Interfaces";
import api from "../../middleware/Appwrite";
import { Button } from "../Button";
import { useStore } from "../../middleware/Zustand/States";
import { Action } from "../../middleware/Zustand/Types";

export default function SearchHistorySuggest() {
  const { user } = useContext(ApiContext);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const setSearchValue = useStore((action: Action) => action.setSearchValue);

  useEffect(() => {
    async function getSearchHistory() {
      try {
        const data = await api.listDocuments(
          import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        );

        const findSearchHistory = data.documents.find(
          (searchHistory: SearchHistory) =>
            searchHistory.id === user.email || searchHistory.id === getEmail(),
        );

        setSearchHistory(findSearchHistory.searchHistory);
      } catch (err) {
        console.error(err);
      }
    }

    getSearchHistory();
  }, []);

  return (
    <section className="column flex alignStart">
      {searchHistory
        .map((searchTerm: string, i: number) => {
          return Button({
            text: searchTerm,
            classNames: "button",
            onClick: () => setSearchValue(searchTerm),
            key: i.toString(),
          });
        })
        .slice(searchHistory.length - 5, searchHistory.length)
        .reverse()}
    </section>
  );
}
