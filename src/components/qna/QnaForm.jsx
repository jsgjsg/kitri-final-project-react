import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenAlt, FaTimes } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import api from "../../api/api";

const QnaForm = () => {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
      return;
    }

    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        navigate("/login"); // 오류가 발생하면 로그인 페이지로 이동
      });
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const qnaData = {
      qa: {
        title: title,
      },
      question: {
        question: question,
      },
    };

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
      return;
    }

    api
      .post("/qa", qnaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/qna"); // 전송 후 Qna 페이지로 이동
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
          <label htmlFor="question" className="block text-2xl font-bold mb-2">
            내용
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
