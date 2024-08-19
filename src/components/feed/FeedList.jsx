// FeedList.js
import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ user, feeds, columns }) => {
  const columnClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div className={`grid ${columnClass} gap-4 max-w-full`}>
      {feeds.length === 0 ? (
        <p>No feeds available.</p>
      ) : (
        feeds.map((feed) => (
          <FeedItem key={feed.id} user={user} feed={feed} columns={columns} />
        ))
      )}
    </div>
  );
};

export default FeedList;
