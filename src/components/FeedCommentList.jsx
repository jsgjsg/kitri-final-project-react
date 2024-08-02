import React from "react";
import FeedCommentItem from "./FeedCommentItem.jsx";

const FeedCommentList = ({ comments, onDelete }) => {
  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="p-2 border rounded-md bg-gray-50">
            <FeedCommentItem comment={comment} onDelete={onDelete}/>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedCommentList;
