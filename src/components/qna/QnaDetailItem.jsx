import React from "react";
import { FaTrashAlt } from "react-icons/fa";

// 최신순으로 정렬해서 보내기
const QnaDetailItem = ({
  question,
  answers = [], // 기본값 설정
  user,
  handleDeleteQuestion,
  handleDeleteAnswer,
  handleSubmitAnswer,
  newAnswer,
  handleAnswerChange,
}) => {
  const questionAnswers = answers.filter((a) => a.questionId === question.id);

  return (
    <div className="relative mb-4 group">
      <div className="relative flex-1 ml-4 bg-white rounded-lg p-3 shadow-lg mt-10 mr-4 border-2 border-black">
        <button className="text-pink-600 w-full hover:underline text-left">
          {question.question}
        </button>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
      </div>
      {user.id === question.userId && (
        <button
          onClick={() => handleDeleteQuestion(question.id)}
          className="absolute top-3 right-8 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaTrashAlt />
        </button>
      )}

      {questionAnswers.map((answer) => (
        <div key={answer.id} className="ml-12 mt-2">
          <div className="relative flex-1 bg-gray-100 rounded-lg p-3 shadow-lg border-2 border-black">
            <button className="text-black w-full hover:underline text-left">
              {answer.answer}
            </button>
            {user.id === answer.userId && (
              <button
                onClick={() => handleDeleteAnswer(answer.id)}
                className="absolute top-3 right-8 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="ml-12 mt-2 flex">
        <input
          type="text"
          value={newAnswer[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="답변을 입력하세요"
        />
        <button
          onClick={() => handleSubmitAnswer(question.id)}
          className="ml-2 p-2 bg-blue-500 text-white rounded flex-shrink-0"
        >
          답변하기
        </button>
      </div>
    </div>
  );
};

export default QnaDetailItem;
