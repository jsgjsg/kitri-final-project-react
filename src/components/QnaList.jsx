import QnaItem from "./QnaItem";

const QnaList = () => {

  // QAs 받고 map으로 QA => QnaItem으로
  
  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      QnaList 페이지
      <QnaItem />
    </div>
  );
}

export default QnaList;