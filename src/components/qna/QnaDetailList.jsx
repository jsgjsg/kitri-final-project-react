import React from "react";
import QnaDetailItem from "./QnaDetailItem";

// QnA 리스트 컴포넌트
const QnaDetailList = ({
  user,
  questions,
  answers,
  handleDeleteQuestion,
  handleDeleteAnswer,
  handleSubmitAnswer,
  newAnswer,
  handleAnswerChange,
}) => {
  return (
    <div className="">
      {questions.map((question) => (
        <div key={question.id}>
          <QnaDetailItem
            question={question}
            answers={answers}
            user={user}
            handleDeleteQuestion={handleDeleteQuestion}
            handleDeleteAnswer={handleDeleteAnswer}
            handleSubmitAnswer={handleSubmitAnswer}
            newAnswer={newAnswer}
            handleAnswerChange={handleAnswerChange}
          />
        </div>
      ))}
    </div>
  );
};

export default QnaDetailList;
