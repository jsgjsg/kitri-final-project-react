import { useNavigate } from "react-router-dom";
import QnaList from "./QnaList";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

const QnA = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/qna/form"); // QnaForm 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 pt-30">
      <div className="flex flex-col items-center w-full max-w-3xl bg-white border-4 border-black rounded-md p-6 mb-20 shadow-lg relative">
        <div className="flex items-center w-full mb-6">
          <AiFillQuestionCircle className="text-5xl text-pink-500 mr-2" />
          <h2 className="text-4xl font-bold">Qna 페이지</h2>
        </div>
        <button
          onClick={handleButtonClick}
          className="absolute top-4 right-4 bg-pastel-blue text-black p-3 rounded-full border-4 border-black hover:bg-pastel-blue-light transition-colors flex items-center"
        >
          <FaPlus className="text-xl" />
        </button>
        <QnaList />
      </div>
    </div>
  );
};

export default QnA;
