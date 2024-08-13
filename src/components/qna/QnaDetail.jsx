import React, { useEffect, useRef, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api"; // api 모듈을 import
import { FaTrashAlt } from "react-icons/fa";

const QnaDetail = () => {
  const { qaId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null); // 스크롤 컨테이너 참조
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [qnaItems, setQnaItems] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 변수

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);

        // QnA 데이터 가져오기
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
            const combined = [...questions, ...answers].sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA - dateB;
            });
            setQnaItems(combined);
            setLoading(false); // 데이터 로딩 완료
            console.log(combined);
          })
          .catch((error) => {
            console.error("Error fetching QnA data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error: ", error);
        navigate("/login"); // 오류가 발생하면 로그인 페이지로 이동
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
          console.log(`Deleted ${itemType} with ID: ${itemId}`);
        })
        .catch((error) => {
          console.error(`Error deleting ${itemType}: `, error);
        });
    }
  };

  const handleAnswerChange = (e) => {
    setNewAnswer(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      api
        .post(`/qa/${qaId}/answers/create`, {
          answer: newAnswer,
          questionId: qnaItems.find((item) => item.type === "question").id,
        })
        .then((response) => {
          const newAnswerItem = {
            id: response.data.id,
            userId: user.id,
            answer: newAnswer,
            questionId: qnaItems.find((item) => item.type === "question").id,
            type: "answer",
          };
          setQnaItems([...qnaItems, newAnswerItem]);
          setNewAnswer("");
          console.log("Posted new answer: ", response.data);
        })
        .catch((error) => {
          alert("의사 계정이 아닙니다");
          console.error("Error posting answer: ", error.message); // 에러 메시지 출력
        });
    }
  };

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      api
        .post(`/qa/${qaId}/questions`, {
          question: newQuestion,
        })
        .then((response) => {
          const newQuestionItem = {
            ...response.data,
            type: "question",
          };
          setQnaItems([...qnaItems, newQuestionItem]);
          setNewQuestion("");
          console.log("Posted new question: ", response.data);
        })
        .catch((error) => {
          console.error("Error posting question: ", error.message); // 에러 메시지 출력
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

      {qnaItems.length > 0 && (
        <div className="mt-6 flex flex-col flex-grow">
          <div
            className="overflow-y-auto max-h-80 mb-4"
            ref={scrollContainerRef}
          >
            {qnaItems.map((item) => (
              <div key={item.id} className="relative mb-4 group">
                <div
                  className={`relative flex-1 ml-4 bg-${
                    item.type === "question" ? "white" : "gray-100"
                  } rounded-lg p-3 shadow-lg mt-10 mr-4 border-2 border-black`}
                >
                  <button
                    className={`text-${
                      item.type === "question" ? "pink-600" : "black"
                    } w-full hover:underline text-left`}
                  >
                    {item.type === "question" ? item.question : item.answer}
                  </button>
                  {user.id === item.userId && (
                    <button
                      onClick={() => handleDeleteItem(item.id, item.type)}
                      className="absolute top-3 right-3 p-1 text-red-500 transition-opacity duration-200"
                      style={{ opacity: 1 }}
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex">
            {user.id ===
            qnaItems.find((item) => item.type === "question")?.userId ? (
              <>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={handleQuestionChange}
                  className="w-full p-2 border rounded"
                  placeholder="새 질문을 입력하세요"
                />
                <button
                  onClick={handleSubmitQuestion}
                  className="ml-2 p-2 bg-pink-500 text-white rounded flex-shrink-0"
                >
                  질문하기
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={newAnswer}
                  onChange={handleAnswerChange}
                  className="w-full p-2 border rounded"
                  placeholder="답변을 입력하세요"
                />
                <button
                  onClick={handleSubmitAnswer}
                  className="ml-2 p-2 bg-blue-500 text-white rounded flex-shrink-0"
                >
                  답변하기
                </button>
              </>
            )}
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
