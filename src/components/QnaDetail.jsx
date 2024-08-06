import React, { useEffect, useState, useRef } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api"; // api 모듈을 import

const QnaDetail = () => {
  const { qaId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [questions, setQuestions] = useState([]);
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
        console.error("Error fetching qas: ", error);
      });
  }, [navigate, qaId]);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [questions]);

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
      <div className="flex-1 overflow-y-auto overflow-x-hidden" ref={scrollRef}>
        {questions.map((question, index) => (
          <div key={index} className="relative mb-4 group">
            <div className="relative flex-1 ml-4 bg-white rounded-lg p-3 shadow-lg mt-10 mr-4 border-2 border-black">
              <button className="text-pink-600 w-full hover:underline text-left">
                {question.question}
              </button>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
            </div>
            {user.id === question.userId && (
              <button
                onClick={() => handleDelete(question.id)}
                className="absolute top-3 right-8 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        ))}
      </div>
      {user.id === questions[0]?.userId && (
        <div className="mt-6 flex items-center">
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
      )}
    </div>
  );
};

export default QnaDetail;
