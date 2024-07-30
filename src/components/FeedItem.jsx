import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlinePlus,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai"; // 아이콘 가져오기
import FeedComment from "./FeedComment.jsx";

const FeedItem = ({ feed }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = () => {
    navigate("/feed/form"); // 게시물 추가 페이지로 이동
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 댓글 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 댓글 모달 닫기
  };

  return (
    <div
      className="mx-auto my-4 p-4 bg-white rounded-lg shadow-lg transition duration-300 hover:shadow-xl border-2 border-gray-300"
      style={{
        width: "300px",
        minHeight: "500px",
        position: "relative",
      }}
    >
      <button
        onClick={handleAddPost}
        className="absolute top-2 right-2 text-blue-500"
      >
        <AiOutlinePlus className="text-3xl" />
      </button>
      <div
        className="flex flex-col items-center h-full"
        style={{ paddingLeft: "16px", paddingRight: "16px" }}
      >
        <div className="flex justify-between w-full mb-2">
          <span className="text-sm mb-4">{feed.user_id}</span>
          <span className="text-sm">
            {feed.created_at
              ? new Date(feed.created_at).toLocaleDateString()
              : "Invalid Date"}
          </span>
        </div>
        <div className="w-full mb-4">
          <img
            src={feed.image}
            alt={feed.item}
            className="w-full h-64 border-2 border-gray-300 mb-4"
          />
        </div>
        <p className="text-sm text-gray-700 text-center mb-4">{feed.content}</p>
        <div className="flex justify-center space-x-6 mb-4">
          <AiOutlineHeart className="text-red-500 cursor-pointer text-xl" />
          <AiOutlineComment
            className="text-gray-600 cursor-pointer text-xl"
            onClick={handleOpenModal}
          />
          <AiOutlineShareAlt className="text-gray-600 cursor-pointer text-xl" />
        </div>
      </div>
      {isModalOpen && (
        <FeedComment isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default FeedItem;
