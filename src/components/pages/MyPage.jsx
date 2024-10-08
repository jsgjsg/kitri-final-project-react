import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ProfileEditForm from "../mypage/ProfileEditForm";
import AddAnimalForm from "../mypage/AddAnimalForm";
import EditAnimalForm from "../mypage/EditAnimalFrom";
import Modal from "react-modal";
import {
  FaEdit,
  FaUserCircle,
  FaUserFriends,
  FaQuestionCircle,
  FaUserEdit,
  FaSignOutAlt,
  FaUserTimes,
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
    // Fetch user profile
    api
      .get("/users/me")
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);

        // Fetch user's animals
        api
          .get(`/animal/${response.data.id}`)
          .then((animalResponse) => {
            setAnimals(animalResponse.data);
            console.log(animalResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching animals: ", error);
          });
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
    // You can handle updating the backend if needed
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
    <div className="flex flex-col items-center w-full font-doodle relative">
      <div className="flex flex-col items-center w-full max-w-xl bg-white border-4 border-black rounded-lg p-4">
        <div className="flex items-center w-full mb-4 relative">
          <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full border-4 border-black">
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
          <div className="ml-4 flex-grow">
            <h2 className="text-2xl font-bold mt-4">{profile.nickname}</h2>
            <p className="text-xl text-gray-500 mt-1">{profile.introduce}</p>
          </div>
          <button
            className="absolute top-0 right-0 mt-1 mr-1 text-black p-1 rounded-lg hover:bg-pastel-blue-light"
            onClick={handleEditProfile}
          >
            <FaEdit className="text-lg" />
          </button>
          <button
            className="absolute bottom-0 right-0 mt-1 mr-1 bg-pastel-yellow text-black p-1 rounded-lg border-4 border-black hover:bg-pastel-yellow-light"
            onClick={handleNavigateToFriends}
          >
            <FaUserFriends className="text-xl" />
          </button>
        </div>

        <hr className="w-full mb-4 border-2 border-gray" />
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center w-full mb-3">
            <h3 className="text-xl font-bold">우리집 댕냥이들</h3>
            <button
              onClick={handleAddAnimal}
              className="flex items-center bg-pastel-green text-black p-1 rounded-lg border-4 border-black hover:bg-pastel-green-light"
            >
              <FaEdit className="mr-1 text-xl" />
              <span>반려동물 추가</span>
            </button>
          </div>
          <ul className="w-full space-y-3 max-h-48 overflow-y-auto">
            {animals.map((animal) => (
              <li
                key={animal.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src={animal.image || "https://via.placeholder.com/100"}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-bold">{animal.name}</h4>
                    <p className="text-gray-500">{animal.type}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleEditAnimal(animal)}
                >
                  <FaEdit className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <hr className="w-full mb-4 border-2 border-gray" />
        <div className="w-full space-y-3">
          <button
            className="flex items-center justify-center w-full bg-pastel-purple text-black p-2 rounded-lg border-4 border-black hover:bg-pastel-purple-light"
            onClick={() => {
              navigate("/inquiry");
            }}
          >
            <FaQuestionCircle className="mr-1 text-xl" />
            <span className="text-lg">문의</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-blue text-black p-2 rounded-lg border-4 border-black hover:bg-pastel-blue-light"
            onClick={() => navigate("/edit-account")}
          >
            <FaUserEdit className="mr-1 text-xl" />
            <span className="text-lg">비밀번호 수정</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-green text-black p-2 rounded-lg border-4 border-black hover:bg-pastel-green-light"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-1 text-xl" />
            <span className="text-lg">Logout</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-pastel-red text-black p-2 rounded-lg border-4 border-black hover:bg-pastel-red-light"
            onClick={handleDeleteAccount}
          >
            <FaUserTimes className="mr-1 text-xl" />
            <span className="text-lg">회원 탈퇴</span>
          </button>
        </div>
        <Modal
          isOpen={editing}
          onRequestClose={handleCancelEdit}
          contentLabel="Profile Edit Modal"
          className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 max-w-md mx-auto mt-10"
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
          className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 max-w-md mx-auto mt-10"
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
          className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 max-w-md mx-auto mt-10"
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
