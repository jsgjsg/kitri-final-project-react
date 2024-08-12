import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig"; // Firebase 설정 파일
import api from "../../api/api"; // API 호출을 위한 설정 파일
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const AddAnimalForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [gender, setGender] = useState("");
  const [neutralization, setNeutralization] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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

  const handleSaveAnimal = async () => {
    const uploadedImageUrl = await handleUpload();
    console.log("제출");

    api
      .post("/animal", {
        name,
        type,
        year,
        month,
        day,
        gender,
        neutralization,
        weight,
        image: uploadedImageUrl, // 이미지 URL을 데이터베이스에 저장
      })
      .then((response) => {
        console.log("성공");
        onSave(response.data);
      })
      .catch((error) => {
        console.log("실패");
        console.error("Error saving animal:", error);
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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2"
      >
        <option value="" disabled>
          종류 선택
        </option>
        <option value="소동물">소동물</option>
        <option value="강아지">강아지</option>
        <option value="고양이">고양이</option>
      </select>
      <div className="flex space-x-2">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2 max-h-32 overflow-y-auto"
        >
          <option value="" disabled>
            태어난 해
          </option>
          {Array.from(new Array(20), (v, k) => (
            <option key={k} value={2024 - k}>
              {2024 - k}
            </option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2 max-h-32 overflow-y-auto"
        >
          <option value="" disabled>
            태어난 달
          </option>
          {Array.from(new Array(12), (v, k) => (
            <option key={k} value={k + 1}>
              {k + 1}
            </option>
          ))}
        </select>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2 max-h-32 overflow-y-auto"
        >
          <option value="" disabled>
            태어난 날
          </option>
          {Array.from(new Array(31), (v, k) => (
            <option key={k} value={k + 1}>
              {k + 1}
            </option>
          ))}
        </select>
      </div>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2"
      >
        <option value="" disabled>
          성별 선택
        </option>
        <option value="남">남</option>
        <option value="여">여</option>
      </select>
      <select
        value={neutralization}
        onChange={(e) => setNeutralization(e.target.value)}
        className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2"
      >
        <option value="" disabled>
          중성화 여부
        </option>
        <option value="1">예</option>
        <option value="0">아니요</option>
      </select>
      <div className="flex items-center">
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="몸무게"
          className="text-xl text-gray-500 w-full border border-gray-300 rounded p-2"
        />
        <span className="ml-2 text-xl text-gray-500">kg</span>
      </div>
      <button
        className="flex items-center justify-center w-full bg-pastel-blue text-black p-4 rounded border-4 border-black hover:bg-pastel-blue-light"
        onClick={handleSaveAnimal}
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

export default AddAnimalForm;
