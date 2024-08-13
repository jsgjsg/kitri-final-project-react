// InquiryDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api"; // 설정한 axios 인스턴스

function InquiryDetail() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

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

    fetchInquiry();
    fetchAnswers();
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

  return (
    <div className="container mx-auto p-4">
      {inquiry ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{inquiry.title}</h1>
          <p className="text-lg mb-4">{inquiry.inquiry}</p>
          {inquiry.image && (
            <img
              src={inquiry.image}
              alt="inquiry"
              className="w-full h-auto mb-4 rounded-lg shadow-sm"
            />
          )}
          <p className="text-sm text-gray-500 mb-4">
            <strong>Posted on:</strong>{" "}
            {new Date(inquiry.createdAt).toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold mb-2">문의답변</h2>
          <ul className="space-y-4 mb-4">
            {answers.map((answer) => (
              <li
                key={answer.id}
                className="border p-4 rounded-lg bg-white shadow-sm"
              >
                <p className="text-base">{answer.inquiryAnswer}</p>
                <small className="text-sm text-gray-500">
                  {new Date(answer.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-2">관리자</h3>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="관리자만 기입가능합니다. 추가질문 있을 시 새로 작성해주세요."
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <button
            onClick={handleAddAnswer}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            문의 답변
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InquiryDetail;
