import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </div>
  );
};

export default ReviewList;
