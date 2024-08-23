import React from "react";

const ReviewCommentItem = ({ comment, onDelete }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md space-y-3">
      <div className="flex justify-between items-start">
        {/* 작성자 정보 및 내용 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700">{comment.nickname}</h4>
          <p className="text-gray-600 mt-1">{comment.content}</p>
        </div>

        {/* 작성 날짜 및 시간 */}
        <div className="text-sm text-gray-500 text-right">
          <p>{comment.createdAt.split(".")[0].split("T")[0]}</p>
          <p>{comment.createdAt.split(".")[0].split("T")[1]}</p>
        </div>
      </div>
      <div className="flex justify-end">
        {/* 삭제 버튼 */}
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
