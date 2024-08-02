import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenAlt, FaTimes } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";

const QnaForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data
    console.log({ title, content });
  };

  const handleCancel = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className="p-8 border-4 border-black rounded-md bg-white font-doodle max-w-2xl mx-auto mt-12 shadow-lg">
      <div className="flex items-center mb-4">
        <AiFillQuestionCircle className="text-5xl text-pink-500 mr-20" />
        <h2 className="text-4xl font-bold">QnaForm 페이지</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-2xl font-bold mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-2 border-black rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-2xl font-bold mb-2">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border-2 border-black rounded"
            rows="6"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-pastel-blue text-black p-3 rounded border-2 border-black flex items-center hover:bg-pastel-blue-light"
          >
            <FaPenAlt className="mr-1" />
            제출
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-pastel-red text-black p-3 rounded border-2 border-black flex items-center hover:bg-pastel-red-light"
          >
            <FaTimes className="mr-1" />
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default QnaForm;
