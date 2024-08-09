import React from "react";
import ReviewCommentItem from "./ReviewCommentItem";

const ReviewCommentList = ({ comments, onDelete }) => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div
            key={index}
            className="p-2 border-2 border-black rounded-md bg-gray-50"
          >
            <ReviewCommentItem comment={comment} onDelete={onDelete} />
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewCommentList;
