import React from "react";

const ReviewCommentItem = ({ comment, onDelete }) => {
  return (
    <div className="p-2 border rounded-md bg-gray-50">
      <p className="text-gray-700">작성자 : {comment.nickname}</p>
      <p className="text-gray-700">내용 : {comment.content}</p>
      <p className="text-gray-700">작성 시간 : {comment.createdAt}</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onDelete(comment.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ReviewCommentItem;
