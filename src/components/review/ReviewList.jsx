import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ user, reviews, columns, currentIndex }) => {
  const columnClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  // 1줄 보기 모드에서는 현재 인덱스의 리뷰만 보여줌
  const visibleReviews = columns === 1 ? [reviews[currentIndex]] : reviews;

  return (
    <div className="flex justify-center">
      {" "}
      {/* 부모 컨테이너를 가운데 정렬 */}
      <div className={`grid ${columnClass} gap-4 max-w-full`}>
        {visibleReviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          visibleReviews.map((review, index) => (
            <ReviewItem
              key={review.id || index}
              user={user}
              review={review}
              columns={columns}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
