import React, { useEffect, useState } from "react";
import { FaUserPlus, FaUserFriends, FaInbox, FaPaperPlane } from "react-icons/fa";
import FriendsList from "../friends/FriendsList";
import api from "../../api/api";
import SearchFriends from "../friends/SearchFriends";
import ReceivedRequestsList from "../friends/ReceivedRequestsList";
import SentRequestsList from "../friends/SentRequestsList";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [friends, setFriends] = useState([]);
  const [receiveRequests, setReceiveRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    // 친구 목록 가져오기
    api.get("/friends")
      .then(response => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    
    // 받은 요청 가져오기
    api.get("/friends/requests/received")
      .then(response => {
        setReceiveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    // 보낸 요청 가져오기
    api.get("/friends/requests/sent")
      .then(response => {
        setSentRequests(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "friendsList":
        return <FriendsList friends={friends} />;
      case "addFriend":
        return <SearchFriends />;
      case "requests":
        return <ReceivedRequestsList receiveRequests={receiveRequests} />;
      case "sentRequests":
        return <SentRequestsList sentRequests={sentRequests} />;
      default:
        return <p>버튼을 눌러서 해당 내용을 확인하세요.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 p-6">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <h1 className="text-2xl font-bold mb-4">친구 관리</h1>

        {/* 버튼들을 가로로 정렬 */}
        <div className="flex space-x-4 mb-4">
          {/* 친구 목록 보기 버튼 */}
          <button
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded w-36 h-12 hover:bg-blue-600"
            onClick={() => setActiveTab("friendsList")}
          >
            <FaUserFriends className="mr-2" />
            친구 목록
          </button>

          {/* 친구 추가하기 버튼 */}
          <button
            className="flex items-center justify-center bg-green-500 text-white p-2 rounded w-36 h-12 hover:bg-green-600"
            onClick={() => setActiveTab("addFriend")}
          >
            <FaUserPlus className="mr-2" />
            친구 추가
          </button>

          {/* 받은 요청 보기 버튼 */}
          <button
            className="flex items-center justify-center bg-yellow-500 text-white p-2 rounded w-36 h-12 hover:bg-yellow-600"
            onClick={() => setActiveTab("requests")}
          >
            <FaInbox className="mr-2" />
            받은 요청
          </button>

          {/* 보낸 요청 보기 버튼 */}
          <button
            className="flex items-center justify-center bg-purple-500 text-white p-2 rounded w-36 h-12 hover:bg-purple-600"
            onClick={() => setActiveTab("sentRequests")}
          >
            <FaPaperPlane className="mr-2" />
            보낸 요청
          </button>
        </div>

        <hr className="w-full mb-6 border-2 border-gray" />

        {/* 동적 콘텐츠 표시 영역 */}
        <div className="w-full bg-gray-200 p-4 rounded border-4 border-black">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
