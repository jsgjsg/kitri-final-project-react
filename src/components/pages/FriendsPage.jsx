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
    getFriends(); // 친구 목록 가져오기
    getReceived(); // 받은 요청 가져오기
    getSent(); // 보낸 요청 가져오기
  }, []);

  useEffect(() => {
    if(activeTab == "addFriend") return;
    if(activeTab == "friendsList") return getFriends();
    if(activeTab == "requests") return getReceived();
    if(activeTab == "sentRequests") return getSent();
  }, [activeTab])

  const getFriends = () => {
    // 친구 목록 가져오기
    api.get("/friends")
    .then(response => {
      setFriends(response.data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

  const getReceived = () => {
    // 받은 요청 가져오기
    api.get("/friends/requests/received")
      .then(response => {
        setReceiveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const getSent = () => {
    // 보낸 요청 가져오기
    api.get("/friends/requests/sent")
      .then(response => {
        setSentRequests(response.data);
        console.log(sentRequests);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const renderContent = () => {
    switch (activeTab) {
      case "friendsList":
        return <FriendsList friends={friends} handleDeleteFriend={handleDeleteFriend}/>;
      case "addFriend":
        return <SearchFriends />;
      case "requests":
        return <ReceivedRequestsList
          receiveRequests={receiveRequests}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
        />;
      case "sentRequests":
        return <SentRequestsList sentRequests={sentRequests} handleCancelRequest={handleCancelRequest}/>;
      default:
        return <p>버튼을 눌러서 해당 내용을 확인하세요.</p>;
    }
  };

  // 친구 요청 취소
  const handleCancelRequest = (requestId) => {
    api.delete(`/friends/requests/sent/${requestId}`)
    .then(response => {
      setSentRequests(sentRequests.filter(request => request.id !== requestId))
      console.log(response.data);
      alert("요청 취소 완료");
    })
    .catch((error) => {
      console.error("검색 중 오류 발생:", error);
    });
  }

  // 요청 수락
  const handleAcceptRequest = (requestId) => {
    api.post(`/friends/requests/received/${requestId}/accept`)
    .then(response => {
      console.log(response.data);
      alert("친구가 추가되었습니다.")
      setReceiveRequests(receiveRequests.filter(receiveReq => receiveReq.id !== requestId));
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

  // 요청 거절
  const handleRejectRequest = (requestId) => {
    api.delete(`/friends/requests/received/${requestId}/reject`)
    .then(response => {
      console.log(response.data);
      alert("거절되었습니다.");
      setReceiveRequests(receiveRequests.filter(receiveReq => receiveReq.id !== requestId));
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

  // 친구 삭제
  const handleDeleteFriend = (friendId) => {
    api.delete(`/friends/${friendId}/delete`)
    .then(response => {
      console.log(response.data);
      alert("친구 삭제 되었습니다.");
      setFriends(friends.filter(friend => friend.id !== friendId));
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  }

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
