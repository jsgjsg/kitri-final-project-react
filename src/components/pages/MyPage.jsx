import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ProfileEditForm from "../mypage/ProfileEditForm";
import {
  FaPenAlt,
  FaCommentDots,
  FaStarHalfAlt,
  FaQuestionCircle,
  FaUserEdit,
  FaSignOutAlt,
  FaUserTimes,
  FaUserCircle,
  FaUserFriends,
  FaInbox,
  FaPaperPlane,
  FaEdit,
} from "react-icons/fa";

const MyPage = () => {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile: ", error);
      });
  }, []);

  const handleLogout = () => {
    api.post("/auth/logout").then((response) => {
      localStorage.removeItem("jwtToken");
      alert(response.data);
      navigate("/login");
    });
  };

  const handleDeleteAccount = () => {
    navigate("/delete-account");
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <div className="flex items-center w-full mb-6">
          <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-4 border-black">
            <img
              src={profile.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="ml-6 flex-grow">
            <h2 className="text-3xl font-bold">{profile.nickname}</h2>
            <p className="text-xl text-gray-500">{profile.introduce}</p>
          </div>{" "}
          {editing ? (
            <ProfileEditForm
              profile={profile}
              onSave={handleProfileUpdate}
              onCancel={handleCancelEdit}
            />
          ) : (
            <button
              className="flex items-center justify-center w-30 bg-pastel-blue text-black p-4 rounded border-4 border-black hover:bg-pastel-blue-light"
              onClick={handleEditProfile}
            >
              <FaEdit className="mr-2 text-xl" />
            </button>
          )}
          <div className="ml-6 flex flex-col space-y-2">
            <button
              className="flex items-center bg-pastel-blue text-black p-2 rounded border-4 border-black hover:bg-pastel-blue-light"
              onClick={() => {
                navigate("/friends");
              }}
            >
              <FaUserFriends className="mr-2 text-2xl" />
              <span>친구</span>
            </button>
            <button className="flex items-center bg-pastel-green text-black p-2 rounded border-4 border-black hover:bg-pastel-green-light">
              <FaInbox className="mr-2 text-2xl" />
              <span>받은 요청</span>
            </button>
            <button className="flex items-center bg-pastel-yellow text-black p-2 rounded border-4 border-black hover:bg-pastel-yellow-light">
              <FaPaperPlane className="mr-2 text-2xl" />
              <span>한 요청</span>
            </button>
          </div>
        </div>
        <hr className="w-full mb-6 border-2 border-gray" />
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
        <hr className="w-full mb-6 border-2 border-gray" />
        <div className="w-full space-y-4">
          <button
            className="flex items-center justify-center w-full bg-pastel-blue text-black p-4 rounded border-4 border-black hover:bg-pastel-blue-light"
            onClick={() => navigate("/edit-account")}
          >
            <FaUserEdit className="mr-2 text-2xl" />
            <span className="text-xl">비밀번호 수정</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-green text-black p-4 rounded border-4 border-black hover:bg-pastel-green-light"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2 text-2xl" />
            <span className="text-xl">Logout</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-red text-black p-4 rounded border-4 border-black hover:bg-pastel-red-light"
            onClick={handleDeleteAccount}
          >
            <FaUserTimes className="mr-2 text-2xl" />
            <span className="text-xl">회원 탈퇴</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
