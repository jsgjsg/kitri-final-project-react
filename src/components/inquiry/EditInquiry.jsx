// EditInquiry.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api"; // 설정한 axios 인스턴스
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function EditInquiry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await api.get(`/inquiry/${id}`);
        setTitle(response.data.title);
        setInquiry(response.data.inquiry);
        setCurrentImageUrl(response.data.image);
        setImageUrl(response.data.image);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
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
            // Progress function (optional)
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
        console.error("Image upload failed:", error);
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
      navigate(`/inquiry/${id}`); // Redirect back to the inquiry detail page
    } catch (error) {
      console.error("Error updating inquiry:", error);
      alert("문의 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Inquiry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Inquiry
          </label>
          <textarea
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-700"
          />
          {currentImageUrl && (
            <img
              src={currentImageUrl}
              alt="Current"
              className="mt-2 w-32 h-auto object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Inquiry
        </button>
      </form>
    </div>
  );
}

export default EditInquiry;
