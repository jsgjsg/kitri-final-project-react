import React from "react";

const ReviewCommentItem = ({ comment, onDelete }) => {
  return (
    <div className="p-2 border-1 border-black rounded-md bg-gray-50 space-y-2">
      <div>작성자 : {comment.nickname}</div>
      <div>내용 : {comment.content}</div>
      <div className="flex justify-between items-center">
        <span>작성 시간 : {comment.createdAt}</span>
        <button
          onClick={() => onDelete(comment.id)}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ReviewCommentItem;
