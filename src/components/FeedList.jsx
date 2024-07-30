import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ feeds }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold mb-4">게시물 목록</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feeds.length === 0 ? (
          <p>게시물이 없습니다.</p>
        ) : (
          feeds.map((feed) => <FeedItem key={feed.id} feed={feed} />)
        )}
      </div>
    </div>
  );
};

export default FeedList;
