import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ feeds }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      <h2 className="text-xl font-bold mb-4">Feed List</h2>
      {feeds.length === 0 ? (
        <p>No feeds available.</p>
      ) : (
        feeds.map((feed) => <FeedItem key={feed.id} feed={feed} />)
      )}
    </div>
  );
};

export default FeedList;
