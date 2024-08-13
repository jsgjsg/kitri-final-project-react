import React from "react";
import SentRequestItem from "./SentRequestsItem";

const SentRequestsList = ({ sentRequests, handleCancelRequest }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">보낸 요청 목록</h2>
      <ul className="space-y-4">
        {sentRequests.length > 0 ? (
          sentRequests.map((request) => (
            <SentRequestItem key={request.id} request={request} handleCancelRequest={handleCancelRequest} />
          ))
        ) : (
          <p>보낸 요청이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default SentRequestsList;
