import axios from "axios";
import FeedFilter from "./FeedFilter";
import FeedList from "./FeedList";
import { useEffect, useState } from "react";
import api from "../api/api";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    api.get("/feeds")
      .then(response => {
        setFeeds(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      Feed 페이지
      <FeedFilter />
      <FeedList feeds = {feeds} />
    </div>
  );
}

export default Feed;
