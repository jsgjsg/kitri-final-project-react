import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const QnaItem = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/qna/detail");
  };

  return (
    <div className="p-6 border-black rounded-md bg-white font-doodle max-w-3xl mx-auto mt-1">
      <div
        className="relative bg-pastel-pink-light p-10 rounded-m2 shadow-lg"
        style={{ height: "600px" }}
      >
        <div className="absolute top-0 right-0 flex items-center mt-2 mr-2">
          <FaUser className="mr-2 text-2xl text-gray-700" />
          <span className="text-2xl">작성자</span>
        </div>
        <div className="relative flex-1 ml-4 bg-white rounded-lg p-3 shadow-lg mt-10">
          <button
            onClick={handleTitleClick}
            className="text-pink-600 w-80 h-210 hover:underline flex items-center justify-end"
          >
            제목
          </button>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default QnaItem;
