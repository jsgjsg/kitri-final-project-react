import React, { useState } from "react";

const ReviewCommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(comment); // 부모 컴포넌트에 댓글을 전달
    setComment(""); // 제출 후 댓글 내용 비우기
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

export default ReviewCommentForm;
