import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import QnaList from "./QnaList";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

const QnA = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [Qnas, setQnas] = useState([]);

  console.log("QNA14");
  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api
      .get(`/users/me`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    api
      .get("/qa")
      .then((response) => {
        setQnas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching qas: ", error);
      });
  }, []);

  const handleButtonClick = () => {
    navigate("/qna/form"); // QnaForm 페이지로 이동
  };
  console.log(Qnas);

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 pt-30">
      <div className="flex flex-col items-center w-full max-w-3xl bg-white border-4 border-black rounded-md p-6 mb-20 shadow-lg relative">
        <div className="flex items-center w-full">
          <AiFillQuestionCircle className="text-5xl text-pink-500 mr-2" />
          <h2 className="text-4xl font-bold">Qna 페이지</h2>
        </div>
        <button
          onClick={handleButtonClick}
          className="absolute top-4 right-4 bg-pastel-blue text-black p-3 rounded-full border-4 border-black hover:bg-pastel-blue-light transition-colors flex items-center"
        >
          <FaPlus className="text-xl" />
        </button>
        <div className="w-full max-w-3xl h-[650px] overflow-y-auto p-6 border-black rounded-md bg-white font-doodle mt-4 shadow-inner">
          <div className="bg-pastel-pink-light p-4 rounded-md shadow-lg h-full overflow-y-auto">
            <QnaList user={user} Qnas={Qnas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnA;
