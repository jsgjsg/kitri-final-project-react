import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import InquiryAnswerList from "./InquiryAnswerList";

function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inquiryResponse = await api.get(`/inquiry/${id}`);
        setInquiry(inquiryResponse.data);

        const answersResponse = await api.get(`/inquiry/answer/${id}`);
        setAnswers(answersResponse.data);

        const userResponse = await api.get("/users/me");
        setCurrentUserId(userResponse.data.id);
      } catch (error) {
        setErrorMessage("데이터를 가져오는 중 오류가 발생했습니다.");
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [id]);

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) {
      setErrorMessage("답변을 입력해주세요.");
      return;
    }

    try {
      const response = await api.post(`/inquiry/answer/${id}/create`, {
        inquiryAnswer: newAnswer,
      });
      setAnswers((prevAnswers) => [...prevAnswers, response.data]);
      setNewAnswer("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("답변 추가 중 오류가 발생했습니다.");
      console.error(
        "Error adding answer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditAnswer = async (answerId) => {
    if (!editedAnswer.trim()) {
      setErrorMessage("답변을 입력해주세요.");
      return;
    }

    try {
      const response = await api.put(`/inquiry/answer/${answerId}/update`, {
        inquiryAnswer: editedAnswer,
      });
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId ? response.data : answer
        )
      );
      setEditingAnswerId(null);
      setEditedAnswer("");
    } catch (error) {
      setErrorMessage("답변 수정 중 오류가 발생했습니다.");
      console.error(
        "Error editing answer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl("");
  };

  const handleDeleteInquiry = async () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      try {
        await api.delete(`/inquiry/${id}/delete`);
        navigate("/inquiry");
      } catch (error) {
        setErrorMessage("문의 삭제 중 오류가 발생했습니다.");
        console.error(
          "Error deleting inquiry:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const formatTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg relative">
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          {errorMessage}
        </div>
      )}
      {inquiry ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
              {inquiry.title}
            </h1>
            <div className="flex space-x-6">
              {currentUserId === inquiry.userId && (
                <>
                  <button
                    onClick={handleDeleteInquiry}
                    className="text-red-600 text-lg font-medium hover:underline"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => navigate(`/inquiry/${id}/edit`)}
                    className="text-blue-600 text-lg font-medium hover:underline"
                  >
                    수정
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Slightly Larger Image */}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2F%EC%9A%B0%EB%8B%A4%EB%8B%A4.png?alt=media&token=1efced6f-3036-4e20-8a60-c4a35008fe94"
            alt="Decorative"
            className="w-auto h-24 mb-6 rounded-lg"
            style={{
              marginLeft: "auto",
              marginRight: 0,
              display: "block",
            }}
          />
          <div className="border-t border-gray-200 pt-8 mb-8">
            <p className="text-xl text-gray-700">
              {formatTextWithLineBreaks(inquiry.inquiry)}
            </p>
            {inquiry.image && (
              <img
                src={inquiry.image}
                alt="inquiry"
                className="w-full max-w-xl h-auto mb-8 rounded-lg shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-95"
                onClick={() => openModal(inquiry.image)}
              />
            )}
          </div>
          <p className="text-md text-gray-500 mb-8">
            <strong>게시일:</strong>{" "}
            {new Date(inquiry.createdAt).toLocaleDateString()}
          </p>
          <hr className="my-8 border-gray-200" />
          <InquiryAnswerList
            answers={answers}
            setAnswers={setAnswers}
            setEditingAnswerId={setEditingAnswerId}
            setEditedAnswer={setEditedAnswer}
            handleEditAnswer={handleEditAnswer}
            editingAnswerId={editingAnswerId}
            editedAnswer={editedAnswer}
          />
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6">답변 작성</h3>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="관리자만 기입 가능합니다. 추가 질문 있을 시 새로 작성해주세요."
              className="w-full p-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button
              onClick={handleAddAnswer}
              className="mt-6 px-6 py-3 text-white rounded-lg transition-transform transform hover:scale-105"
              style={{
                background: "linear-gradient(to bottom, #e9d7f0, #c6a9e0)",
              }}
            >
              답변 추가
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="relative bg-white rounded-lg p-8 max-w-4xl mx-auto">
                <img
                  src={modalImageUrl}
                  alt="Full Size"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-800 text-4xl bg-white p-3 rounded-full hover:bg-gray-200"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => navigate(-1)}
            className="fixed bottom-8 right-8 bg-gradient-to-b from-purple-400 to-purple-100 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-300 hover:to-purple-50 transition duration-300"
          >
            돌아가기
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl">로딩 중...</p>
      )}
    </div>
  );
}

export default InquiryDetail;
