import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaPenAlt,
  FaCommentDots,
  FaStarHalfAlt,
  FaQuestionCircle,
  FaUserEdit,
  FaSignOutAlt,
  FaUserTimes,
  FaUserCircle,
} from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai"; // 반려동물 아이콘 추가

const MyPage = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        console.log(response.data);
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile: ", error);
      });
  }, []);

  const handleLogout = () => {
    api.post("/auth/logout").then((response) => {
      localStorage.removeItem("jwtToken"); // JWT 토큰 삭제
      alert(response.data);
      navigate("/login"); // 로그인 페이지로 이동
    });
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100">
      <div className="absolute top-4 right-4 w-12 h-12">
        <AiFillHeart className="text-4xl text-pink-500" />{" "}
        {/* 반려동물 아이콘 */}
      </div>
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <div className="flex items-center w-full mb-6">
          <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-4 border-black">
            {/* 프로필 이미지 */}
            <FaUserCircle className="text-8xl text-gray-500" />
          </div>
          <div className="ml-6">
            <h2 className="text-3xl font-bold">{profile.nickname}</h2>
            <p className="text-xl text-gray-500">{profile.email}</p>
          </div>
        </div>
        <hr className="w-full mb-6 border-2 border-glay" />
        <div className="flex w-full mb-6 space-x-4">
          <button className="flex-1 bg-pastel-blue text-black p-4 rounded border-4 border-black shadow hover:bg-pastel-blue-light">
            <div className="flex flex-col items-center">
              <FaPenAlt className="text-3xl mb-2" />
              <span className="text-xl">게시글</span>
            </div>
          </button>
          <button className="flex-1 bg-pastel-green text-black p-4 rounded border-4 border-black shadow hover:bg-pastel-green-light">
            <div className="flex flex-col items-center">
              <FaCommentDots className="text-3xl mb-2" />
              <span className="text-xl">댓글</span>
            </div>
          </button>
          <button className="flex-1 bg-pastel-yellow text-black p-4 rounded border-4 border-black shadow hover:bg-pastel-yellow-light">
            <div className="flex flex-col items-center">
              <FaStarHalfAlt className="text-3xl mb-2" />
              <span className="text-xl">후기</span>
            </div>
          </button>
          <button className="flex-1 bg-pastel-pink text-black p-4 rounded border-4 border-black shadow hover:bg-pastel-pink-light">
            <div className="flex flex-col items-center">
              <FaQuestionCircle className="text-3xl mb-2" />
              <span className="text-xl">QnA</span>
            </div>
          </button>
        </div>
        <hr className="w-full mb-6 border-2 border-glay" />
        <div className="w-full space-y-4">
          <button className="flex items-center justify-center w-full bg-pastel-blue text-black p-4 rounded border-4 border-black hover:bg-pastel-blue-light">
            <FaUserEdit className="mr-2 text-2xl" />
            <span className="text-xl">회원 정보 수정</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-green text-black p-4 rounded border-4 border-black hover:bg-pastel-green-light"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2 text-2xl" />
            <span className="text-xl">Logout</span>
          </button>
          <button className="flex items-center justify-center w-full bg-pastel-red text-black p-4 rounded border-4 border-black hover:bg-pastel-red-light">
            <FaUserTimes className="mr-2 text-2xl" />
            <span className="text-xl">회원 탈퇴</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
