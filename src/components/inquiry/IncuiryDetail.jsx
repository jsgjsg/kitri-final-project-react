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

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await api.get(`/inquiry/${id}`);
        setInquiry(response.data);
      } catch (error) {
        console.error("Error fetching inquiry:", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await api.get(`/inquiry/answer/${id}`);
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await api.get("/users/me");
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchInquiry();
    fetchAnswers();
    fetchCurrentUser();
  }, [id]);

  const handleAddAnswer = async () => {
    try {
      const response = await api.post(`/inquiry/answer/${id}/create`, {
        inquiryAnswer: newAnswer,
      });
      setAnswers([...answers, response.data]);
      setNewAnswer("");
    } catch (error) {
      console.error("Error adding answer:", error);
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
    if (window.confirm("정말 삭제 하시겠어요?")) {
      try {
        await api.delete(`/inquiry/${id}/delete`);
        navigate("/inquiry"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {inquiry ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{inquiry.title}</h1>
            <div className="flex space-x-2">
              {currentUserId === inquiry.userId && ( // Only show if the current user is the author
                <>
                  <button
                    onClick={handleDeleteInquiry}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/inquiry/${id}/edit`)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-lg mb-4">{inquiry.inquiry}</p>
          {inquiry.image && (
            <img
              src={inquiry.image}
              alt="inquiry"
              className="w-48 h-auto mb-4 rounded-lg shadow-sm cursor-pointer object-cover"
              onClick={() => openModal(inquiry.image)}
            />
          )}
          <p className="text-sm text-gray-500 mb-4">
            <strong>Posted on:</strong>{" "}
            {new Date(inquiry.createdAt).toLocaleDateString()}
          </p>
          <InquiryAnswerList answers={answers} setAnswers={setAnswers} />
          <h3 className="text-lg font-semibold mb-2">관리자</h3>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="관리자만 기입가능합니다. 추가질문 있을 시 새로 작성해주세요. 써지긴 할지라도 등록은 안됩니다."
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <button
            onClick={handleAddAnswer}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            문의 답변
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative">
                <img
                  src={modalImageUrl}
                  alt="Full Size"
                  className="max-w-full max-h-screen object-contain"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white text-2xl bg-black p-2 rounded-full"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default InquiryDetail;
