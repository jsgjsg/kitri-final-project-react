import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

const ReviewForm = () => {
  const { id } = useParams(); // 수정 시 사용할 리뷰 ID
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      // 수정 모드: 기존 데이터 불러오기
      // API 호출로 데이터 가져오는 부분은 제외했습니다.
      setTitle("Sample Title"); // 예시 데이터
      setContent("Sample Content"); // 예시 데이터
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직은 제외했습니다.
    if (id) {
      console.log("Updating review with ID:", id);
    } else {
      console.log("Adding new review");
    }
  };

  const handleCancel = () => {
    navigate("/review"); // Review 페이지로 이동
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 border-2 border-black rounded-md shadow-md bg-white font-doodle">
      <h2 className="text-3xl font-bold mb-4">
        {id ? "Edit Review" : "Add Review"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border-2 border-black rounded-md w-full"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 border-2 border-black rounded-md w-full"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-pastel-blue text-black p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaPlus className="mr-2" /> {id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
