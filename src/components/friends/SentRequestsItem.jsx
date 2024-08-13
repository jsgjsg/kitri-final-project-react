import React from "react";

const SentRequestsItem = ({ request, handleCancelRequest }) => {
  return (
    <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
          <img
            src={request.image || "https://via.placeholder.com/150"}
            alt={request.nickname}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-bold">{request.nickname}</h4>
          <p className="text-gray-500">"{request.introduce}"</p>
        </div>
      </div>
      <button
        onClick={() => handleCancelRequest(request.id)} // 요청 ID를 전달
        className="text-red-500 hover:text-red-700"
      >
        요청 취소
      </button>
    </li>
  );
};

export default SentRequestsItem;
