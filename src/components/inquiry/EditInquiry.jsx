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
      navigate("/inquiry");
    } catch (error) {
      console.error("Error updating inquiry:", error.message);
      alert("문의 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-xl bg-gray-50 shadow-lg rounded-2xl relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">문의 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        <div>
          <label
            className="block text-base font-medium text-gray-700 mb-2"
            htmlFor="title"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-3 text-base"
            required
          />
        </div>
        <div>
          <label
            className="block text-base font-medium text-gray-700 mb-2"
            htmlFor="inquiry"
          >
            문의 내용
          </label>
          <textarea
            id="inquiry"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-3 text-base h-60"
            required
          />
        </div>
        <div>
          <label
            className="block text-base font-medium text-gray-700 mb-2"
            htmlFor="image"
          >
            이미지
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50 p-3 text-base"
          />
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out text-base"
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => navigate("/inquiry")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out text-base"
          >
            목록
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInquiry;
