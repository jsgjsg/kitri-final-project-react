import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ProfileEditForm from "../mypage/ProfileEditForm";
import Modal from "react-modal";
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

Modal.setAppElement("#root"); // root 엘리먼트를 모달의 루트로 설정

const MyPage = () => {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile: ", error);
      });

    // 쿠키 설정
    document.cookie = "key=value; SameSite=None; Secure";
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
  console.log(profile.location);
  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <div className="flex items-center w-full mb-6">
          <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-4 border-black">
            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-500" />
            )}
          </div>
          <div className="ml-6 flex-grow">
            <h2 className="text-3xl font-bold mt-5">{profile.nickname}</h2>
            <p className="text-2xl text-gray-500 mt-10">{profile.introduce}</p>
          </div>{" "}
          <button
            className="flex items-center justify-center w-30 text-black p-4 rounded hover:bg-pastel-blue-light"
            onClick={handleEditProfile}
          >
            <FaEdit className="mr-2 text-xl" />
          </button>
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
        <Modal
          isOpen={editing}
          onRequestClose={handleCancelEdit}
          contentLabel="Profile Edit Modal"
          className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-300 max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <ProfileEditForm
            profile={profile}
            onSave={handleProfileUpdate}
            onCancel={handleCancelEdit}
          />
        </Modal>
      </div>
    </div>
  );
};

export default MyPage;
