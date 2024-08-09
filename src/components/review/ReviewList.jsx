import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ user, reviews }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 max-w-full">
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review.id} user={user} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
