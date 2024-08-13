import React from "react";

const ReceivedRequestsItem = ({ request, handleAcceptRequest, handleRejectRequest }) => {
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
      <div>
        <button
          className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
          onClick={() => handleAcceptRequest(request.id)}
        >
          수락
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={() => handleRejectRequest(request.id)}
        >
          거절
        </button>
      </div>
    </li>
  );
};

export default ReceivedRequestsItem;
