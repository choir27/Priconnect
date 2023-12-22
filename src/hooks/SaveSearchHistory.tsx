import api from "../middleware/Appwrite";
import { Permission, Role } from "appwrite";
import { SearchInterface, SearchHistory } from "../middleware/Interfaces";
import { getEmail } from "../middleware/Sessions";
import { toast } from "react-toastify";

export async function SaveSearchHistory(props: SearchInterface) {
  try {
    const searchHistory = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
    );

    //find current logged in users search history
    const findSearchHistory = searchHistory.documents.find(
      (searchHistory: SearchHistory) => {
        if (
          searchHistory.id === props.user.$id ||
          searchHistory.id === getEmail()
        ) {
          return searchHistory;
        }
      },
    );

    if (findSearchHistory) {
      const array = findSearchHistory.searchHistory;

      array.push(props.searchValue);

      const data = {
        searchHistory: array,
      };

      //update array with new search value

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        findSearchHistory.$id,
        data,
      );
    } else {
      //create new object in database and create search history if none exist in DB
      const data = {
        id: props.user.email || getEmail(),
        searchHistory: [props.searchValue],
      };

      await api.createDocument(
        import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        data,
        [
          Permission.read(Role.user(props.user.$id || (getEmail() as string))),
          Permission.update(
            Role.user(props.user.$id || (getEmail() as string)),
          ),
          Permission.delete(
            Role.user(props.user.$id || (getEmail() as string)),
          ),
        ],
      );
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
