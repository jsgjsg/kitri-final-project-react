import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ feeds }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {feeds.length === 0 ? (
        <p>No feeds available.</p>
      ) : (
        feeds.map((feed) => <FeedItem key={feed.id} feed={feed} />)
      )}
    </div>
  );
};

export default FeedList;
