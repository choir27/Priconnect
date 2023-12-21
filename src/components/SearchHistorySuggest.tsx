import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../middleware/Context";
import { getEmail } from "../middleware/Sessions";
import { SearchHistory } from "../middleware/Interfaces";
import api from "../middleware/Appwrite";

export default function SearchHistorySuggest() {
  const { user } = useContext(ApiContext);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

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

  return searchHistory
    .map((searchTerm: string, i: number) => {
      return <h1 key={i}>{searchTerm}</h1>;
    })
    .slice(searchHistory.length - 5, searchHistory.length);
}
