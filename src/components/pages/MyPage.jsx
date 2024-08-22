import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ProfileEditForm from "../mypage/ProfileEditForm";
import AddAnimalForm from "../mypage/AddAnimalForm";
import EditAnimalForm from "../mypage/EditAnimalFrom";
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
  const [addingAnimal, setAddingAnimal] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [animals, setAnimals] = useState([]);
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

    api
      .get("/animal")
      .then((response) => {
        setAnimals(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching animals: ", error);
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

  const handleAddAnimal = () => {
    setAddingAnimal(true);
  };

  const handleSaveAnimal = (newAnimal) => {
    setAnimals([...animals, newAnimal]);
    setAddingAnimal(false);
  };

  const handleCancelAddAnimal = () => {
    setAddingAnimal(false);
  };

  const handleEditAnimal = (animal) => {
    setEditingAnimal(animal);
  };

  const handleUpdateAnimal = (updatedAnimal) => {
    setAnimals(
      animals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    );
    setEditingAnimal(null);
    window.location.reload(); // 프로필 업데이트 후 새로고침
  };

  const handleDeleteAnimal = (id) => {
    setAnimals(animals.filter((animal) => animal.id !== id));
    setEditingAnimal(null);
  };

  const handleCancelEditAnimal = () => {
    setEditingAnimal(null);
    window.location.reload(); // 프로필 업데이트 후 새로고침
  };

  const handleNavigateToFriends = () => {
    navigate("/friends");
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative ">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-lg p-6 mt-24 mb-20">
        <div className="flex items-center w-full mb-6 relative">
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
            <p className="text-2xl text-gray-500 mt-2">{profile.introduce}</p>
          </div>
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-black p-2 rounded-lg hover:bg-pastel-blue-light"
            onClick={handleEditProfile}
          >
            <FaEdit className="text-xl" />
          </button>
          {/* 친구 페이지로 이동하는 버튼을 프로필 근처로 이동 */}
          <button
            className="absolute bottom-0 right-0 mt-2 mr-2 bg-pastel-yellow text-black p-2 rounded-lg border-4 border-black hover:bg-pastel-yellow-light"
            onClick={handleNavigateToFriends}
          >
            <FaUserFriends className="text-2xl" />
          </button>
        </div>

        <hr className="w-full mb-6 border-2 border-gray" />
        <div className="w-full space-y-4">
          <div className="flex justify-between items-center w-full mb-4">
            <h3 className="text-2xl font-bold">우리집 댕냥이들</h3>
            <button
              onClick={handleAddAnimal}
              className="flex items-center bg-pastel-green text-black p-2 rounded-lg border-4 border-black hover:bg-pastel-green-light"
            >
              <FaEdit className="mr-2 text-2xl" />
              <span>반려동물 추가</span>
            </button>
          </div>
          <ul className="w-full space-y-4 max-h-64 overflow-y-auto">
            {animals.map((animal) => (
              <li
                key={animal.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src={animal.image || "https://via.placeholder.com/150"}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold">{animal.name}</h4>
                    <p className="text-gray-500">{animal.type}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleEditAnimal(animal)}
                >
                  <FaEdit className="text-xl" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <hr className="w-full mb-6 border-2 border-gray" />
        <div className="w-full space-y-4">
          <button
            className="flex items-center justify-center w-full bg-pastel-purple text-black p-4 rounded-lg border-4 border-black hover:bg-pastel-purple-light"
            onClick={() => {navigate("/inquiry")}}
          >
            <FaQuestionCircle className="mr-2 text-2xl" />
            <span className="text-xl">문의</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-blue text-black p-4 rounded-lg border-4 border-black hover:bg-pastel-blue-light"
            onClick={() => navigate("/edit-account")}
          >
            <FaUserEdit className="mr-2 text-2xl" />
            <span className="text-xl">비밀번호 수정</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-green text-black p-4 rounded-lg border-4 border-black hover:bg-pastel-green-light"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2 text-2xl" />
            <span className="text-xl">Logout</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-red text-black p-4 rounded-lg border-4 border-black hover:bg-pastel-red-light"
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
        <Modal
          isOpen={addingAnimal}
          onRequestClose={handleCancelAddAnimal}
          contentLabel="Add Animal Modal"
          className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-300 max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <AddAnimalForm
            onSave={handleSaveAnimal}
            onCancel={handleCancelAddAnimal}
          />
        </Modal>
        <Modal
          isOpen={!!editingAnimal}
          onRequestClose={handleCancelEditAnimal}
          contentLabel="Edit Animal Modal"
          className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-300 max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <EditAnimalForm
            animal={editingAnimal}
            onSave={handleUpdateAnimal}
            onDelete={handleDeleteAnimal}
            onCancel={handleCancelEditAnimal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default MyPage;
