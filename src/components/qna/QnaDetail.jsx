import React, { useEffect, useRef, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { FaTrashAlt } from "react-icons/fa";
import exampleImage from "../../assets/images/example.jpg";

const QnaDetail = () => {
  const { qaId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [user, setUser] = useState({});
  const [qnaItems, setQnaItems] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);

        Promise.all([
          api.get(`/qa/${qaId}/questions`),
          api.get(`/qa/${qaId}/answers`),
        ])
          .then(([questionsResponse, answersResponse]) => {
            const questions = questionsResponse.data.map((q) => ({
              ...q,
              type: "question",
              userId: q.userId,
            }));
            const answers = answersResponse.data.map((a) => ({
              ...a,
              type: "answer",
            }));
            const combined = [...questions.slice(0, 1), ...answers].sort(
              (a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA - dateB;
              }
            );
            setQnaItems(combined);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching QnA data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error: ", error);
        navigate("/login");
      });
  }, [qaId, navigate]);

  useEffect(() => {
    if (!loading && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [qnaItems, loading]);

  const handleDeleteItem = (itemId, itemType) => {
    const confirmMessage =
      itemType === "question"
        ? "정말로 이 질문을 삭제하시겠습니까?"
        : "정말로 이 답변을 삭제하시겠습니까?";

    if (window.confirm(confirmMessage)) {
      const deleteEndpoint =
        itemType === "question"
          ? `/qa/${qaId}/questions/${itemId}`
          : `/qa/${qaId}/answers/${itemId}/delete`;

      api
        .delete(deleteEndpoint)
        .then(() => {
          setQnaItems(qnaItems.filter((item) => item.id !== itemId));
        })
        .catch((error) => {
          console.error(`Error deleting ${itemType}: `, error);
        });
    }
  };

  const handleAnswerChange = (e) => {
    setNewAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      api
        .post(`/qa/${qaId}/answers/create`, {
          answer: newAnswer,
          questionId: qnaItems[0].id,
        })
        .then((response) => {
          const newAnswerItem = {
            id: response.data.id,
            userId: user.id,
            answer: newAnswer,
            questionId: qnaItems[0].id,
            type: "answer",
          };
          setQnaItems([...qnaItems, newAnswerItem]);
          setNewAnswer("");
        })
        .catch((error) => {
          alert("의사 계정이 아닙니다");
          console.error("Error posting answer: ", error.message);
        });
    }
  };

  const handleEndChat = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 w-full">
      {/* Top Bar */}
      <div className="w-full bg-white shadow-lg fixed top-0 z-10 h-20 flex justify-between items-center px-8">
        <h1 className="text-3xl font-bold text-gray-800">QnaDetail 페이지</h1>
        <AiFillQuestionCircle className="text-4xl text-pink-500" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto pt-24 p-8">
        {qnaItems.length > 0 && (
          <div className="flex flex-col space-y-6">
            {/* 첫 질문만 표시 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={qnaItems[0].userAvatar || exampleImage}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-xl font-semibold text-gray-800">
                  {qnaItems[0].nickname || "Unknown User"}
                </div>
              </div>
              <p className="text-xl text-gray-800">{qnaItems[0].question}</p>
            </div>

            {/* 답변들 */}
            <div className="overflow-y-auto max-h-96" ref={scrollContainerRef}>
              {qnaItems.slice(1).map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={item.userAvatar || exampleImage}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="text-lg font-medium text-gray-700">
                      {item.nickname || "Unknown User"}
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">{item.answer}</p>
                  {user.id === item.userId && (
                    <button
                      onClick={() => handleDeleteItem(item.id, item.type)}
                      className="absolute top-3 right-3 p-1 text-red-500 transition-opacity duration-200"
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* 답변 입력 */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newAnswer}
                onChange={handleAnswerChange}
                className="flex-grow p-4 border rounded-lg"
                placeholder="답변을 입력하세요"
              />
              <button
                onClick={handleSubmitAnswer}
                className="p-4 bg-blue-500 text-white rounded-lg"
              >
                답변하기
              </button>
              <button
                onClick={handleEndChat}
                className="p-4 bg-red-500 text-white rounded-lg"
              >
                <FiLogOut className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnaDetail;
