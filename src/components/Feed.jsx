import axios from "axios";
import FeedFilter from "./FeedFilter";
import FeedList from "./FeedList";
import { useEffect, useState } from "react";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/feeds")
      .then((response) => {
        setFeeds(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Feed 페이지</h1>
      <FeedFilter />
      <FeedList feeds={feeds} />
    </div>
  );
};

export default Feed;
