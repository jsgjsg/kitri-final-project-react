import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const QnaItem = ({ user, Qna }) => {
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
    <div className="flex justify-between items-center mt-4 p-4 w-full max-w-2xl mx-auto">
      <div className="relative flex-1 bg-white rounded-lg p-3 shadow-lg max-w-1/5 ">
        <button
          onClick={handleTitleClick}
          className="text-pink-600 w-full hover:underline text-left"
        >
          {Qna.title}
        </button>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
      </div>
      <div className="flex items-center ml-4">
        <FaUser className="mr-2 text-2xl text-gray-700" />
        <span className="text-2xl">{Qna.userId}</span>
      </div>
    </div>
  );
};
export default QnaItem;
