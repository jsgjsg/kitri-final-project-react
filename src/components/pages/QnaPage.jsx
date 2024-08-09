import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import QnaList from "../qna/QnaList";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaPlus, FaTrashAlt, FaSyncAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const QnA = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [Qnas, setQnas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 변수
  const [filteredQnas, setFilteredQnas] = useState([]); // 필터링된 QnA 상태 변수

  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api
      .get(`/users/me`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    api
      .get("/qa")
      .then((response) => {
        setQnas(response.data);
        setFilteredQnas(response.data); // 초기 QnA 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching qas: ", error);
      });
  }, []);

  useEffect(() => {
    // 검색어 변경 시 필터링 로직
    setFilteredQnas(
      Qnas.filter((qna) =>
        qna.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, Qnas]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleButtonClick = () => {
    navigate("/qna/form"); // QnaForm 페이지로 이동
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDelete = (id) => {
    if (window.confirm("정말로 이 QnA를 삭제하시겠습니까?")) {
      console.log("58");
      api
        .delete(`/qa/${id}`)
        .then(() => {
          setQnas(Qnas.filter((qna) => qna.id !== id));
          setFilteredQnas(filteredQnas.filter((qna) => qna.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting QnA: ", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 pt-30">
      <div className="flex flex-col items-center w-full max-w-3xl bg-white border-4 border-black rounded-md p-6 mb-20 shadow-lg relative">
        <div className="flex items-center w-full">
          <AiFillQuestionCircle className="text-5xl text-pink-500 mr-2" />
          <h2 className="text-4xl font-bold">Qna 페이지</h2>
          <div className="ml-auto flex items-center space-x-2 ml-20">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded"
              placeholder="검색어를 입력하세요"
            />
            <FiSearch className="text-2xl text-gray-70" />
          </div>
          <button
            onClick={() => handleDelete(id)}
            className="absolute top-0 right-8 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaTrashAlt />
          </button>
        </div>
        <button
          onClick={handleButtonClick}
          className="absolute top-4 right-4 bg-pastel-blue text-black p-3 rounded-full border-4 border-black hover:bg-pastel-blue-light transition-colors flex items-center"
        >
          <FaPlus className="text-xl" />
        </button>
        <button
          onClick={handleRefresh}
          className="absolute top-4 right-20 bg-gray-200 text-black p-3 rounded-full border-4 border-black hover:bg-gray-300 transition-colors flex items-center"
        >
          <FaSyncAlt className="text-xl" />
        </button>
        <div className="w-full max-w-3xl h-[650px] overflow-y-auto p-6 border-black rounded-md bg-white font-doodle mt-4 shadow-inner">
          <div className="bg-pastel-pink-light p-4 rounded-md shadow-lg h-full overflow-y-auto">
            <QnaList
              user={user}
              Qnas={filteredQnas}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnA;