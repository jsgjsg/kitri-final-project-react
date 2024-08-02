import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ user, feeds }) => {
  return (
    <div className="flex flex-col items-center w-full font-doodle">
      {feeds.length === 0 ? (
        <p>No feeds available.</p>
      ) : (
        feeds.map((feed) => <FeedItem key={feed.id} user={user} feed={feed} />)
      )}
    </div>
  );
};

export default FeedList;
