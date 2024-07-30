// src/components/FeedCommentList.jsx
import React from "react";

const FeedCommentList = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="p-2 border rounded-md bg-gray-50">
            <p className="text-gray-700">{comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedCommentList;
