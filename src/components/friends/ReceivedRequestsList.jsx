import React from "react";
import ReceivedRequestItem from "./ReceivedRequestsItem";

const ReceivedRequestsList = ({ receiveRequests, handleAcceptRequest, handleRejectRequest }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">받은 요청 목록</h2>
      <ul className="space-y-4">
        {receiveRequests.length > 0 ? (
          receiveRequests.map((request) => (
            <ReceivedRequestItem
              key={request.id} request={request}
              handleAcceptRequest={handleAcceptRequest}
              handleRejectRequest={handleRejectRequest}
            />
          ))
        ) : (
          <p>받은 요청이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default ReceivedRequestsList;
