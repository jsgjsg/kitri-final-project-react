import React, { useState } from "react";

const FeedCommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={comment}
        onChange={handleCommentChange}
        className="w-full p-2 border rounded-md"
        rows="4"
        placeholder="Write your comment here..."
        required
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit Comment
        </button>
      </div>
    </form>
  );
};

export default FeedCommentForm;
