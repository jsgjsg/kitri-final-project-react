import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ user, feeds, columns, currentIndex }) => {
  const columnClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  // 1줄 보기 모드에서는 현재 인덱스의 피드만 보여줌
  const visibleFeeds = columns === 1 ? [feeds[currentIndex]] : feeds;

  return (
    <div className={`grid ${columnClass} gap-4 max-w-full`}>
      {visibleFeeds.length === 0 ? (
        <p>No feeds available.</p>
      ) : (
        visibleFeeds.map((feed) => (
          <FeedItem key={feed.id} user={user} feed={feed} columns={columns} />
        ))
      )}
    </div>
  );
};

export default FeedList;
