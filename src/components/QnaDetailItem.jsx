import { FaTrashAlt } from "react-icons/fa";

const QnaDetailItem = ({question, user, handleDelete}) => {
  console.log("HI");
  
  return(
    <div className="relative mb-4 group">
      <div className="relative flex-1 ml-4 bg-white rounded-lg p-3 shadow-lg mt-10 mr-4 border-2 border-black">
        <button className="text-pink-600 w-full hover:underline text-left">
          {question.question}
        </button>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
      </div>
      {user.id === question.userId && (
        <button
          onClick={() => handleDelete(question.id)}
          className="absolute top-3 right-8 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  )
}

export default QnaDetailItem;