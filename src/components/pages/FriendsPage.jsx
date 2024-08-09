import React from "react";
import { FaUserPlus, FaUserFriends, FaInbox } from "react-icons/fa";

const FriendsPage = () => {
  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 p-6">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <h1 className="text-2xl font-bold mb-4">친구 관리</h1>

        {/* 친구 목록 보기 버튼 */}
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white p-2 rounded flex items-center hover:bg-blue-600"
            onClick={() => alert('친구 목록 보기')}
          >
            <FaUserFriends className="mr-2" />
            친구 목록
          </button>
        </div>

        {/* 친구 추가하기 버튼 */}
        <div className="mb-4">
          <button
            className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600"
            onClick={() => alert('친구 추가하기')}
          >
            <FaUserPlus className="mr-2" />
            친구 추가하기
          </button>
        </div>

        {/* 받은 요청 보기 버튼 */}
        <div className="mb-4">
          <button
            className="bg-yellow-500 text-white p-2 rounded flex items-center hover:bg-yellow-600"
            onClick={() => alert('받은 요청 보기')}
          >
            <FaInbox className="mr-2" />
            받은 요청
          </button>
        </div>

        <hr className="w-full mb-6 border-2 border-gray" />

        {/* 친구 목록 */}
        <ul className="list-none p-0 w-full">
          {/* 친구 목록 아이템을 여기에 추가하세요 */}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
