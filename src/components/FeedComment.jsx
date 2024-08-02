import React, { useState } from "react";
import FeedCommentForm from "./FeedCommentForm";
import FeedCommentList from "./FeedCommentList";
import { FaTimes } from "react-icons/fa";

const FeedComment = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState([]);

  const handleSubmitComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md border-2 border-black font-doodle">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <FeedCommentForm onSubmit={handleSubmitComment} />
        <br />
        <FeedCommentList comments={comments} />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white p-2 rounded-md border-2 border-black hover:bg-red-600 transition-colors flex items-center"
          >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedComment;
