import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import api from "../../api/api";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";

const ProfileEditForm = ({ profile, onSave, onCancel }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const [introduce, setIntroduce] = useState(profile.introduce);
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
      })
      .then((response) => {
        onSave(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border-4 border-black mx-auto">
        <input type="file" onChange={handleImageChange} />
      </div>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="text-3xl font-bold w-full"
      />
      <textarea
        value={introduce}
        onChange={(e) => setIntroduce(e.target.value)}
        className="text-xl text-gray-500 w-full"
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
