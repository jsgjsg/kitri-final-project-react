import QnaDetailItem from "./QnaDetailItem";
// 받은 데이터를 map으로 출력
// 데이터 키의 answer이 존재하면!! 다르게 나타내기
const QnaDetailList = ({ user, questions, handleDelete }) => {
  return (
    <div className="">
      {questions.map((question) => (
        <div>
          <QnaDetailItem
            key={question.id}
            question={question}
            user={user}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default QnaDetailList;
