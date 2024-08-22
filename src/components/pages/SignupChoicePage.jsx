import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog } from "react-icons/fa"; // 새로운 아이콘 추가

const SigupChoice = () => {
  const navigate = useNavigate();

  const handleChoiceSignup = () => {
    navigate("/signup"); // 프로필 페이지로 이동
  };

  const handleChoiceDoctor = () => {
    navigate("/doctor/signup"); // 설정 페이지로 이동
  };

  return (
    <div className="bg-white p-16 rounded-lg shadow-lg w-50 border-4 border-black relative">
      {/* 프로필 아이콘 위치 */}
      <h2 className="text-3xl font-bold mb-8 text-center">회원가입</h2>
      <button
        onClick={handleChoiceSignup}
        className="w-full bg-pastel-blue text-black p-3 rounded-md border-4 border-black hover:bg-pastel-blue-light transition-colors mb-4"
      >
        <FaUserCircle className="inline-block mr-2" />
        회원가입
      </button>
      <button
        onClick={handleChoiceDoctor}
        className="w-full bg-pastel-gray text-black p-3 rounded-md border-4 border-black hover:bg-gray-600 transition-colors"
      >
        <FaCog className="inline-block mr-2" />
        의사가입
      </button>
    </div>
  );
};

export default SigupChoice;
