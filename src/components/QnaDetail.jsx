import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";

const QnaDetail = () => {
  // Question, Answer 데이터 받기
  // 한번에 다룰수 있는가?
  // 날짜 순으로 정렬하기!
  return (
    <div className="p-6 border-2 border-black rounded-md bg-white font-doodle max-w-lg mx-auto mt-12 shadow-lg">
      <div className="flex items-center mb-4">
        <AiFillQuestionCircle className="text-4xl text-pink-500 mr-2" />
        <h2 className="text-3xl font-bold">QnaDetail 페이지</h2>
      </div>
    </div>
  );
};

export default QnaDetail;
