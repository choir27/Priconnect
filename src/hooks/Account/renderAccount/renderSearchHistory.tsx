import { SearchHistory } from "../../../middleware/Interfaces";
import { useEffect, useState, useContext } from "react";
import { getEmail } from "../../../middleware/Sessions";
import { ApiContext } from "../../../middleware/Context";
import api from "../../../middleware/Appwrite";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";

async function removeSearchWord() {
  try {
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

async function clearSearchHistory() {
  try {
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}

export default function RenderSearchHistory() {
  const { user } = useContext(ApiContext);
  const [searchHistory, setSearchHistory] = useState<React.JSX.Element[]>([]);

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

        const searchHistoryList = findAccount.searchHistory.map(
          (search: string, i: number) => {
            return (
              <section key={i}>
                <h1>{search}</h1>
                {Button({
                  text: "",
                  classNames: "button fa-solid fa-xmark",
                  onClick: () => "",
                })}
              </section>
            );
          },
        );

        setSearchHistory(searchHistoryList);
      } catch (err) {
        console.error(err);
        toast.error(`${err}`);
      }
    }

    GetSearchData();
  }, []);

  return (
    <section>
      <h3>Your Search History</h3>
      {searchHistory}
    </section>
  );
}
