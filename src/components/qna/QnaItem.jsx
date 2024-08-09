import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // 아이콘 변경
import { FaTrashAlt } from "react-icons/fa";

const QnaItem = ({ user, Qna, handleDelete }) => {
  const navigate = useNavigate();
  const [isMe, setIsMe] = useState(false);
  console.log(Qna);

  console.log(user);
  if (!isMe && user.id === Qna.userId) {
    setIsMe(true);
  }

  const handleTitleClick = () => {
    navigate(`/qna/detail/${Qna.id}`);
  };

  return (
    <div className="relative mb-4 group w-full flex items-center mt-10">
      <div className="flex items-center mt-10">
        <FaUserCircle className="mr-2 text-2xl text-gray-700" />
        <span className="text-2xl">{Qna.userId}</span>
      </div>
      <div className="relative flex-1 bg-white rounded-lg p-3 shadow-lg mt-10 border-black ml-10">
        <button
          onClick={handleTitleClick}
          className="text-pink-600 w-full hover:underline text-left"
        >
          {Qna.title}
        </button>
      </div>
      {isMe && (
        <button
          onClick={() => handleDelete(Qna.id)}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity mt-5"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default QnaItem;
