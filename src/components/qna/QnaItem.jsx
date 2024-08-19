import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaClock } from "react-icons/fa";

const QnaItem = ({ user, Qna, handleDelete }) => {
  const navigate = useNavigate();
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    setIsMe(user.id === Qna.userId);
  }, [user.id, Qna.userId]);

  const handleTitleClick = () => {
    navigate(`/qna/detail/${Qna.id}`);
  };

  return (
    <div className="relative mb-4 w-full flex items-center bg-white p-4 border-b border-gray-100 group">
      <div className="flex items-center mr-10">
        {/* 프로필 사진 추가 */}
        {Qna.image ? (
          <img
            src={Qna.image}
            alt="Profile"
            className="w-16 h-16 rounded-full border border- object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-white">?</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <button
          onClick={handleTitleClick}
          className="text-pink-600 hover:underline text-lg font-medium w-full text-left"
        >
          {Qna.title}
        </button>
        <div className="text-gray-500 text-sm mt-2 flex items-center">
          <span className="font-semibold mr-2">
            {Qna.nickname || "Unknown"}
          </span>
          <FaClock className="mr-1" />
          <span>
            {new Date(Qna.createdAt).toLocaleDateString()}{" "}
            {new Date(Qna.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
      {isMe && (
        <button
          onClick={() => handleDelete(Qna.id)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-red-500 text-white rounded-full transition-opacity group-hover:opacity-100"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default QnaItem;
