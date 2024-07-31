import React, { useState, useEffect } from "react";
import api from "../api/api";
import FeedList from "./FeedList";
import FeedFilter from "./FeedFilter";
import exampleImage from "../assets/images/example.jpg";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8080/api/feeds")
      .then((response) => {
        setFeeds(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feeds: ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <div className="flex items-center justify-between w-full mb-4">
        <img
          src={exampleImage}
          alt="Example"
          className="w-100 h-20 object-cover mb-2 rounded"
        />
        <FeedFilter />
      </div>
      <FeedList feeds={feeds} />
    </div>
  );
};

export default Feed;
