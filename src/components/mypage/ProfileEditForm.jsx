import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import api from "../../api/api";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const ProfileEditForm = ({ profile, onSave, onCancel }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const [introduce, setIntroduce] = useState(profile.introduce);
  const [location, setLocation] = useState(profile.location);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(profile.image);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              resolve(downloadURL);
            });
          }
        );
      } else {
        resolve(imageUrl);
      }
    });
  };

  const handleSaveProfile = async () => {
    const uploadedImageUrl = await handleUpload();

    api
      .put(`/users/me`, {
        nickname,
        introduce,
        image: uploadedImageUrl,
        location,
      })
      .then((response) => {
        onSave(response.data);
        window.location.reload(); // 프로필 업데이트 후 새로고침
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-4 border-black mx-auto">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <AiOutlinePlus className="text-6xl text-gray-400" />
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
      </div>
      <p className="text-3xl font-bold w-full mr-60">{nickname}</p>
      <label className="block text-lg font-medium text-gray-700">
        상태 메시지 :
      </label>
      <input
        value={introduce}
        onChange={(e) => setIntroduce(e.target.value)}
        className="text-lg text-gray-500 w-full border border-gray-300 rounded p-2"
      />
      <label className="block text-lg font-medium text-gray-700">
        사는 곳을 입력해주세요 :
      </label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="text-lg text-gray-500 w-full border border-gray-300 rounded p-2"
      />
      <button
        className="flex items-center justify-center w-full bg-pastel-blue text-black p-4 rounded border-4 border-black hover:bg-pastel-blue-light"
        onClick={handleSaveProfile}
      >
        <FaUserEdit className="mr-2 text-2xl" />
        <span className="text-xl">저장</span>
      </button>
      <button
        className="flex items-center justify-center w-full bg-gray-300 text-black p-4 rounded border-4 border-black hover:bg-gray-400"
        onClick={onCancel}
      >
        <FaUserTimes className="mr-2 text-2xl" />
        <span className="text-xl">취소</span>
      </button>
    </div>
  );
};

export default ProfileEditForm;
