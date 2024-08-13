import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api"; // api 모듈을 import
import { FaTrashAlt } from "react-icons/fa";

const QnaDetail = () => {
  const { qaId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState({});

  useEffect(() => {
    // const token = localStorage.getItem("jwtToken");
    // if (!token) {
    //   navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
    //   return;
    // }

    // 접속중인 사용자 정보 가져오기
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
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
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      });

    api
      .get(`/qa/${qaId}/answers`)
      .then((response) => {
        setAnswers(response.data || []);
        console.log("Answers: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching answers: ", error);
      });
  }, []);

  const handleDeleteAnswer = (answerId) => {
    if (window.confirm("정말로 이 답변을 삭제하시겠습니까?")) {
      api
        .delete(`/qa/${qaId}/answers/${answerId}/delete`)
        .then(() => {
          setAnswers(answers.filter((a) => a.id !== answerId));
          console.log(`Deleted answer with ID: ${answerId}`);
        })
        .catch((error) => {
          console.error("Error deleting answer: ", error);
        });
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setNewAnswer((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitAnswer = (questionId) => {
    if (newAnswer[questionId]?.trim()) {
      api
        .post(`/qa/${qaId}/answers/create`, {
          answer: newAnswer[questionId],
          questionId,
        })
        .then((response) => {
          setAnswers([
            ...answers,
            {
              id: response.data.id,
              userId: user.id,
              answer: newAnswer[questionId],
              questionId,
            },
          ]);
          setNewAnswer((prev) => ({ ...prev, [questionId]: "" }));
          console.log("Posted new answer: ", response.data);
        })
        .catch((error) => {
          console.error("Error posting answer: ", error.message); // 에러 메시지 출력
        });
    }
  };

  const handleEndChat = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className="p-6 border-black rounded-md bg-white font-doodle max-w-3xl mx-auto mt-1 h-[600px] flex flex-col">
      <div className="flex items-center mb-4">
        <AiFillQuestionCircle className="text-4xl text-pink-500 mr-2" />
        <h2 className="text-3xl font-bold">QnaDetail 페이지</h2>
      </div>

      {questions.length > 0 && (
        <div className="mt-6 flex flex-col flex-grow">
          <div className="overflow-y-auto max-h-80 mb-4">
            {questions[0] && (
              <div key={questions[0].id} className="relative mb-4 group">
                <div className="relative flex-1 ml-4 bg-white rounded-lg p-3 shadow-lg mt-10 mr-4 border-2 border-black">
                  <button className="text-pink-600 w-full hover:underline text-left">
                    {questions[0].question}
                  </button>
                  <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
                </div>
              </div>
            )}

            {answers.map((answer) => (
              <div key={answer.id} className="ml-12 mt-2">
                <div className="relative flex-1 bg-gray-100 rounded-lg p-3 shadow-lg border-2 border-black">
                  <button className="text-black w-full hover:underline text-left">
                    {answer.answer}
                  </button>
                  {user.id === answer.userId && (
                    <button
                      onClick={() => handleDeleteAnswer(answer.id)}
                      className="absolute top-3 right-3 p-1 text-red-500 rounded-full transition-opacity duration-200"
                      style={{ opacity: 1 }}
                    >
                      <FaTrashAlt className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={newAnswer[questions[0].id] || ""}
              onChange={(e) =>
                handleAnswerChange(questions[0].id, e.target.value)
              }
              className="w-full p-2 border rounded"
              placeholder="답변을 입력하세요"
            />
            <button
              onClick={() => handleSubmitAnswer(questions[0].id)}
              className="ml-2 p-2 bg-blue-500 text-white rounded flex-shrink-0"
            >
              답변하기
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
