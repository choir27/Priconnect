import { SearchInput } from "../../hooks/Post/Inputs";
import { useStore } from "../../middleware/Zustand/States";
import { Action, State } from "../../middleware/Zustand/Types";
import { Button } from "../Button";
import { useNavigate } from "react-router";
import { SaveSearchHistory } from "../../hooks/SaveSearchHistory";
import { useContext } from "react";
import { ApiContext } from "../../middleware/Context";
import SearchHistorySuggest from "./SearchHistorySuggest";

export default function SearchBar() {
  const setSearchValue = useStore((action: Action) => action.setSearchValue);
  const searchValue = useStore((state: State) => state.searchValue);
  const navigate = useNavigate();

  const { user } = useContext(ApiContext);

  return (
    <section className="search flex alignCenter">
      {SearchInput({
        setSearchValue: (e: string) => setSearchValue(e),
        searchValue,
      })}
      {Button({
        text: "",
        classNames: "fa-solid fa-magnifying-glass",
        onClick: () => {
          SaveSearchHistory({ user, searchValue });
          navigate("/searchResults");
        },
      })}
      {/* <SearchHistorySuggest /> */}
    </section>
  );
}
