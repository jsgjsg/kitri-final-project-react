import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

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
        className="w-full p-2 border-2 border-black rounded-md"
        rows="4"
        placeholder="Write your comment here..."
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-pastel-blue text-black p-2 rounded-md border-2 border-black hover:bg-blue-600 transition-colors flex items-center"
        >
          <FaPaperPlane className="mr-2" />
          추가하기
        </button>
      </div>
    </form>
  );
};

export default FeedCommentForm;
