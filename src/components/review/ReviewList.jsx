// ReviewList.js
import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ user, reviews, columns }) => {
  return (
    <div
      className={`grid gap-4 max-w-full ${
        columns === 1
          ? "grid-cols-1 justify-items-center"
          : columns === 2
          ? "grid-cols-2"
          : "grid-cols-3"
      }`}
    >
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <ReviewItem
            key={review.id}
            user={user}
            review={review}
            columns={columns}
          />
        ))
      )}
    </div>
  );
};

export default ReviewList;
