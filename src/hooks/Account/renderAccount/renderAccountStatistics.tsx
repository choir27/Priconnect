import { ApiContext } from "../../../middleware/Context";
import { useContext, useState, useEffect } from "react";
import { Account } from "../../../middleware/Interfaces";
import { getEmail } from "../../../middleware/Sessions";
import api from "../../../middleware/Appwrite";

export default function RenderAccountStatistics() {
  const { user } = useContext(ApiContext);
  const [statistics, setStatistics] = useState<React.JSX.Element>();

  useEffect(() => {
    async function getStatistics() {
      try {
        const subscribeData = await api.listDocuments(
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_DATABASE_ID,
          import.meta.env.VITE_REACT_APP_SUBSCRIBE_COLLECTION_ID,
        );

        const findAccount = subscribeData.documents?.find(
          (subscribePosts: Account) =>
            subscribePosts.id === user.email ||
            subscribePosts.id === getEmail(),
        );

        const renderStatistics = (
          <section className="flex justifyBetween statistics">
            <div className="flex">
              <h2>{findAccount?.numOfLikes | 0}</h2>
              <h2>Likes</h2>
            </div>
            <div className="flex">
              <h2>{findAccount?.numOfSubscriptions | 0}</h2>
              <h2>Followers</h2>
            </div>
            <div className="flex">
              <h2>{findAccount?.numOfPosts | 0}</h2>
              <h2>Posts </h2>
            </div>
          </section>
        );

        setStatistics(renderStatistics);
      } catch (err) {
        console.error(err);
      }
    }

    getStatistics();
  }, []);

  return statistics;
}
