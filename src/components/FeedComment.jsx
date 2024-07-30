// src/components/FeedComment.jsx
import React, { useState } from 'react';
import FeedCommentForm from './FeedCommentForm';
import FeedCommentList from './FeedCommentList';

const FeedComment = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState([]);

  const handleSubmitComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <FeedCommentForm
          onSubmit={handleSubmitComment}
        />
        <br />
        <FeedCommentList comments={comments} />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FeedComment;
