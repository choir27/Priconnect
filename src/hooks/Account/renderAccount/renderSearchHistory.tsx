import { SearchHistory } from "../../../middleware/Interfaces";
import { useEffect, useState, useContext } from "react";
import { getEmail } from "../../../middleware/Sessions";
import { ApiContext } from "../../../middleware/Context";
import api from "../../../middleware/Appwrite";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import PaginatedNav from "../../../components/PaginatedNav";

async function removeSearchWord(
  account: SearchHistory | undefined,
  searchWord: string,
) {
  try {
    if (account && account.searchHistory) {
      const arr = account?.searchHistory;

      arr.splice(arr.indexOf(searchWord), 1);

      const data = {
        searchHistory: arr,
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        account.$id,
        data,
      );

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export async function clearSearchHistory(account: SearchHistory | undefined) {
  try {
    if (account) {
      const data = {
        searchHistory: [],
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        account.$id,
        data,
      );

      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export default function RenderSearchHistory() {
  const { user } = useContext(ApiContext);
  const [searchHistory, setSearchHistory] = useState<React.JSX.Element[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 2;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

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

        const searchHistoryList = findAccount?.searchHistory
          .map((search: string, i: number) => {
            return (
              <section key={i} className="flex justifyBetween searchWord">
                <span className="flex alignCenter">{search}</span>
                {Button({
                  text: "",
                  classNames: "button fa-solid fa-xmark",
                  onClick: () => removeSearchWord(findAccount, search),
                })}
              </section>
            );
          })
          .slice(startIndex, endIndex);

        setSearchHistory(searchHistoryList);
      } catch (err) {
        console.error(err);
        toast.error(`${err}`);
      }
    }

    GetSearchData();
  }, []);

  return (
    <section className="searchHistory">
      <h2>Search History</h2>
      {searchHistory}

      <PaginatedNav
        {...{
          setCurrentPage,
          length: searchHistory.length,
          rowsPerPage: rowsPerPage,
          currentPage: currentPage,
        }}
      />
    </section>
  );
}
