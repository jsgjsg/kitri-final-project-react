import React, { useState, useEffect } from "react";
import api from "../../api/api";

function InquiryAnswerList({ answers, setAnswers }) {
  const [editAnswerId, setEditAnswerId] = useState(null);
  const [editAnswerText, setEditAnswerText] = useState("");

  useEffect(() => {
    setEditAnswerId(null);
    setEditAnswerText("");
  }, [answers]);

  const handleEditAnswer = async (answerId) => {
    if (!answerId || !editAnswerText.trim()) return;

    try {
      await api.put(`/inquiry/answer/${answerId}/update`, {
        inquiryAnswer: editAnswerText,
      });
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, inquiryAnswer: editAnswerText }
            : answer
        )
      );
      setEditAnswerId(null);
      setEditAnswerText("");
    } catch (error) {
      console.error(
        "답변 업데이트 중 오류 발생:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!answerId) return;

    try {
      await api.delete(`/inquiry/answer/${answerId}/delete`);
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== answerId)
      );
    } catch (error) {
      console.error(
        "답변 삭제 중 오류 발생:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">문의 답변</h2>
      <ul className="space-y-4 mb-4">
        {answers.map((answer) => (
          <li
            key={answer.id}
            className="border p-4 rounded-lg bg-white shadow-sm flex items-center justify-between"
          >
            <div className="flex-1">
              {editAnswerId === answer.id ? (
                <div className="flex flex-col">
                  <textarea
                    value={editAnswerText}
                    onChange={(e) => setEditAnswerText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  />
                  <button
                    onClick={() => handleEditAnswer(answer.id)}
                    className="px-4 py-2 bg-gradient-to-b from-purple-300 to-purple-100 text-white rounded-lg hover:from-purple-200 hover:to-purple-50 transition duration-300"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-base">{answer.inquiryAnswer}</p>
                  <small className="text-sm text-gray-500">
                    {new Date(answer.createdAt).toLocaleString()}
                  </small>
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center space-x-2">
              {editAnswerId === answer.id ? (
                <button
                  onClick={() => setEditAnswerId(null)}
                  className="text-gray-600 text-sm hover:underline"
                >
                  취소
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditAnswerId(answer.id);
                    setEditAnswerText(answer.inquiryAnswer);
                  }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  수정
                </button>
              )}
              <button
                onClick={() => handleDeleteAnswer(answer.id)}
                className="text-red-600 text-sm hover:underline"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InquiryAnswerList;
