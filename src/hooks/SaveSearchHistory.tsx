import api from "../middleware/Appwrite";
import { Permission, Role } from "appwrite";
import { SearchInterface, SearchHistory } from "../middleware/Interfaces";
import { getEmail } from "../middleware/Sessions";

export async function SaveSearchHistory(props: SearchInterface) {
  try {
    const searchHistory = await api.listDocuments(
      import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
      import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
    );

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

    if (findSearchHistory.id) {
      const array = findSearchHistory.searchHistory;

      array.push(props.searchValue);

      const data = {
        searchHistory: array,
      };

      await api.updateDocument(
        import.meta.env.VITE_REACT_APP_SEARCH_DATABASE_ID,
        import.meta.env.VITE_REACT_APP_SEARCH_COLLECTION_ID,
        findSearchHistory.$id,
        data,
      );
    } else {
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
  }
}
