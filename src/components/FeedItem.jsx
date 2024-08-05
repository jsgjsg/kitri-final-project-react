import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedComment from "./FeedComment";
import { FaComments, FaEdit, FaPlus, FaHeart, FaRegHeart } from "react-icons/fa"; // FaHeart 추가
import NoImage from "../assets/images/NoImage.jpg";

const FeedItem = ({ user, feed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isMe, setIsMe] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    navigate("/feed/form");
  };

  if(!isMe && user.id === feed.userId) {
    setIsMe(true); // !isMe를 하지 않으면 무한 렌더링
    console.log(isMe);
  }

  return (
    <div className="relative p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-lg w-full max-w-xs h-150">
      {isMe ? (
        <button
          onClick={handleButtonClick}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaEdit />
        </button>
      ) : (
        <button
          onClick={handleButtonClick}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaPlus />
        </button>
      )}
      <h3 className="text-lg font-semibold truncate mb-2">{feed.userId}</h3>
      <img
        src={feed.image || NoImage}
        alt={feed.image ? "Feed Image" : "No Image Available"}
        className="w-full h-64 object-cover mb-2 rounded"
      />
      <p className="text-gray-700 mb-2 text-sm">category : {feed.animal}</p>
      <p className="text-gray-700 mb-2 text-sm">{feed.content}</p>
      <p className="text-gray-500 text-xs mb-2">{feed.createdAt}</p>
      {/* created_at 필드 추가 */}
      <div className="flex justify-end mt-2">
        <button className="flex items-center space-x-1 text-red-500 p-2 rounded transition-colors mr-3 hover:bg-red-200">
          {/* <FaHeart /> */}
          <FaRegHeart />
        </button>
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-1 text-green-500 p-2 rounded hover:bg-green-200 transition-colors"
        >
          <FaComments />
        </button>
      </div>
      {isModalOpen && (
        <FeedComment feedId={feed.id} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default FeedItem;
