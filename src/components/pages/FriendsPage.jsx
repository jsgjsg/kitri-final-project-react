import React, { useState } from "react";
import { FaUserPlus, FaUserFriends, FaInbox } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const FriendsPage = () => {
  const [friends, setFriends] = useState(['John Doe', 'Jane Smith']);
  const [newFriend, setNewFriend] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddFriend = () => {
    if (newFriend.trim() && !friends.includes(newFriend.trim())) {
      setFriends([...friends, newFriend.trim()]);
      setNewFriend('');
    }
  };

  const handleRemoveFriend = (friend) => {
    setFriends(friends.filter(f => f !== friend));
  };

  const filteredFriends = friends.filter(friend =>
    friend.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 p-6">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <h1 className="text-2xl font-bold mb-4">친구 목록</h1>

        {/* 친구 추가 */}
        <div className="flex items-center mb-4 border border-gray-300 p-2 rounded">
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            placeholder="새 친구 추가"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button
            onClick={handleAddFriend}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            <FaUserPlus className="inline mr-1" />
            Add Friend
          </button>
        </div>

        {/* 검색 */}
        <div className="flex items-center mb-4 border border-gray-300 p-2 rounded">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="친구 검색"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <AiOutlineSearch className="text-2xl text-gray-500 ml-2" />
        </div>

        {/* 받은 요청 버튼 */}
        <div className="mb-4">
          <button
            className="bg-yellow-500 text-white p-2 rounded flex items-center"
            onClick={() => alert('받은 요청 보기')}
          >
            <FaInbox className="mr-2" />
            받은 요청
          </button>
        </div>
        <hr className="w-full mb-6 border-2 border-gray" />
        {/* 친구 목록 */}
        <ul className="list-none p-0 w-full">
          {filteredFriends.map((friend, index) => (
            <li key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
              <span>{friend}</span>
              <button
                onClick={() => handleRemoveFriend(friend)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
