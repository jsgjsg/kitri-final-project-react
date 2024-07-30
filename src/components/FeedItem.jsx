import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedComment from "./FeedComment";

const FeedItem = ({ feed }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    navigate("/feed/form"); // FeedForm 페이지로 이동
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold truncate">
          작성자: {feed.user_id}
        </h3>
        <button className="text-blue-500">+</button>
      </div>
      <img
        src={feed.image}
        alt={feed.item}
        className="w-full h-32 object-cover mb-2 rounded"
      />
      <p className="text-gray-700 mb-2 text-sm">
        <strong>내용:</strong> {feed.content}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>동물:</strong> {feed.animal}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>작성일:</strong> {feed.created_at}
      </p>
      <div className="flex justify-between">
        <button
          onClick={handleButtonClick}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          게시물 수정
        </button>
        <button
          onClick={handleOpenModal}
          className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors text-sm"
        >
          댓글 보기
        </button>
      </div>
      <FeedComment isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default FeedItem;
