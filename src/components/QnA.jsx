import { useNavigate } from "react-router-dom";
import QnaList from "./QnaList";

const Qna = () => {
  const navigate = useNavigate();

  // QAs 데이터 받기

  const handleButtonClick = () => {
    navigate("/qna/form"); // QnaForm 페이지로 이동
  };
  
  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      Qna 페이지

      <button
        onClick={handleButtonClick}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
      >
        Qna 작성
      </button>
      
      <QnaList />
    </div>
  );
}

export default Qna;