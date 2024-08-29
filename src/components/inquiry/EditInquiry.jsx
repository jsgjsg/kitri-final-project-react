import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function EditInquiry() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await api.get(`/inquiry/${id}`);
        setTitle(response.data.title);
        setInquiry(response.data.inquiry);
        setImageUrl(response.data.image);
      } catch (error) {
        console.error("Failed to fetch inquiry:", error);
      }
    };

    fetchInquiry();
  }, [id]);

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
        console.error("Image upload failed:", error.message);
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
    }

    try {
      await api.put(`/inquiry/${id}/update`, {
        title,
        inquiry,
        image: uploadedImageUrl,
      });
      navigate(`/inquiry/${id}`);
    } catch (error) {
      console.error("Error updating inquiry:", error.message);
      alert("문의 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="container mx-auto p-10 max-w-3xl bg-white shadow-xl rounded-2xl relative">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">문의 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
        <div>
          <label
            className="block text-lg font-medium text-gray-800 mb-3"
            htmlFor="title"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-4 text-lg"
            required
          />
        </div>
        <div>
          <label
            className="block text-lg font-medium text-gray-800 mb-3"
            htmlFor="inquiry"
          >
            문의 내용
          </label>
          <textarea
            id="inquiry"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-4 text-lg h-72"
            required
          />
        </div>
        <div>
          <label
            className="block text-lg font-medium text-gray-800 mb-3"
            htmlFor="image"
          >
            이미지
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-4 text-lg"
          />
        </div>
        <div className="flex justify-between mt-8 space-x-6">
          <button
            type="button"
            onClick={() => navigate(`/inquiry/${id}`)}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out text-lg"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out text-lg"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInquiry;
