import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api"; // api 모듈을 import
import QnaDetailList from "./QnaDetailList";

const QnaDetail = () => {
  const { qaId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
      return;
    }

    // 접속중인 사용자 정보 가져오기
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        navigate("/login"); // 오류가 발생하면 로그인 페이지로 이동
      });

    // QnA 데이터 가져오기
    api
      .get(`/qa/${qaId}/questions`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      });

    api
      .get(`/qa/${qaId}/answers`)
      .then((response) => {
        setAnswers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching answers: ", error);
      });

  }, [qaId, navigate]);

  const handleDelete = (questionId) => {
    if (window.confirm("정말로 이 질문을 삭제하시겠습니까?")) {
      api
        .delete(`/qa/${qaId}/questions/${questionId}`)
        .then(() => {
          setQuestions(questions.filter((q) => q.id !== questionId));
        })
        .catch((error) => {
          console.error("Error deleting question: ", error);
        });
    }
  };

  const handleInputChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSubmit = () => {
    // 질문 제출 로직
    if (newQuestion.trim()) {
      api
        .post(`/qa/${qaId}/questions`, { question: newQuestion })
        .then((response) => {
          console.log(response.data);
          setQuestions([
            ...questions,
            { id: response.data.id, userId: user.id, question: newQuestion },
          ]);
          setNewQuestion("");
        })
        .catch((error) => {
          console.error("Error posting question: ", error);
        });
    }
  };

  const handleEndChat = () => {
    // 대화 종료 로직
    navigate(-1); // 뒤로가기
  };

  return (
    <div className="p-6 border-black rounded-md bg-white font-doodle max-w-3xl mx-auto mt-1 h-[600px] flex flex-col">
      <div className="flex items-center mb-4">
        <AiFillQuestionCircle className="text-4xl text-pink-500 mr-2" />
        <h2 className="text-3xl font-bold">QnaDetail 페이지</h2>
      </div>
      
      {user.id === questions[0]?.userId && (
        <div className="mt-6 flex flex-col flex-grow">
          <div className="overflow-y-auto max-h-80 mb-4">
            <QnaDetailList
              user={user}
              questions={questions}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex">
            <input
              type="text"
              value={newQuestion}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="새 질문을 입력하세요"
            />
            <button
              onClick={handleSubmit}
              className="ml-2 p-2 bg-pink-500 text-white rounded flex-shrink-0"
            >
              질문하기
            </button>
            <button
              onClick={handleEndChat}
              className="ml-2 p-2 bg-red-500 text-white rounded flex-shrink-0"
            >
              <FiLogOut className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QnaDetail;
