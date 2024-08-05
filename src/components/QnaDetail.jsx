import React, { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api"; // api 모듈을 import

const QnaDetail = () => {
  const { qaId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
      return;
    }
    console.log("Detail 20");
    // 접속중인 사용자 정보 가져오기
    api
      .get("/users/me")
      .then((response) => {
        console.log("Detail 25");
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        navigate("/login"); // 오류가 발생하면 로그인 페이지로 이동
      });

    // QnA 데이터 가져오기
    api
      .get(`/qa/${qaId}/questions`)
      .then((response) => {
        console.log("Detail 37");
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching qas: ", error);
      });

    api
      .get(`/qa/${qaId}/answers`)
      .then((response) => {
        console.log("Detail 52");

        setAnswers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching qas: ", error);
      });
  }, [navigate]);

  return (
    <div className="p-6 border-black rounded-md bg-white font-doodle max-w-3xl mx-auto mt-1">
      <div className="flex items-center mb-4">
        <AiFillQuestionCircle className="text-4xl text-pink-500 mr-2" />
        <h2 className="text-3xl font-bold">QnaDetail 페이지</h2>
      </div>
      -{" "}
      {questions.map((questions, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mt-2 mr-2">
            <FaUser className="mr-2 text-2xl text-gray-700" />
            <span className="text2xl">1</span>
          </div>
          <div className="relative flex-1 ml-4 bg-white rounded-lg p-3 shadow-lg mt-10">
            <button className="text-pink-600 w-80 h-210 hover:underline flex items-center justify-end">
              1
            </button>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] w-0 h-0 border-t-[12px] border-t-transparent border-l-[23px] border-l-white border-b-[12px] border-b-transparent"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QnaDetail;
