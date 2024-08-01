import React from "react";
import ReviewCommentItem from "./ReviewCommentItem";

const ReviewCommentList = ({ comments, onDelete }) => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto"> {/* 고정된 높이와 스크롤 추가 */}
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <ReviewCommentItem key={comment.id} comment={comment} onDelete={onDelete}/>
        ))
      )}
    </div>
  );
};

export default ReviewCommentList;
