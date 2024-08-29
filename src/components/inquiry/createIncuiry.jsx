import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function CreateInquiry() {
  const [title, setTitle] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

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
          (snapshot) => {
            console.log("Upload is in progress...");
          },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedImageUrl = imageUrl;

    if (image) {
      try {
        uploadedImageUrl = await handleUpload();
      } catch (error) {
        console.error(
          "Image upload failed:",
          error.response ? error.response.data : error.message
        );
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
    }

    try {
      await api.post("/inquiry", {
        title,
        inquiry,
        image: uploadedImageUrl,
      });
      navigate("/inquiry");
    } catch (error) {
      console.error(
        "Error creating inquiry:",
        error.response ? error.response.data : error.message
      );
      alert("문의 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="container mx-auto p-12 max-w-2xl bg-gray-50 shadow-lg rounded-3xl relative">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">문의 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
        <div>
          <label
            className="block text-lg font-medium text-gray-700 mb-3"
            htmlFor="title"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-4 text-lg"
            required
          />
        </div>
        <div>
          <label
            className="block text-lg font-medium text-gray-700 mb-3"
            htmlFor="inquiry"
          >
            문의 내용
          </label>
          <textarea
            id="inquiry"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-4 text-lg h-72"
            required
          />
        </div>
        <div>
          <label
            className="block text-lg font-medium text-gray-700 mb-3"
            htmlFor="image"
          >
            이미지
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-4 text-lg"
          />
        </div>
        <div className="flex justify-between mt-8 space-x-6">
          <button
            type="button"
            onClick={() => navigate("/inquiry")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out text-lg"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out text-lg"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateInquiry;
