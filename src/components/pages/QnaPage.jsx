import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import QnaList from "../qna/QnaList";
import exampleImage from "../../assets/images/example.jpg";
import { FaPlus, FaUser, FaSyncAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const QnA = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [Qnas, setQnas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 변수
  const [filteredQnas, setFilteredQnas] = useState([]); // 필터링된 QnA 상태 변수
  const [showMyQnas, setShowMyQnas] = useState(false); // My QnAs 상태

  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    fetchQnas();
  }, []);

  const fetchQnas = () => {
    api
      .get("/qa")
      .then((response) => {
        setQnas(response.data);
        setFilteredQnas(response.data); // 초기 QnA 데이터 설정
      })
      .catch((error) => {
        console.error("Error fetching qas: ", error);
      });
  };

  const fetchMyQnas = () => {
    api
      .get("/qa")
      .then((response) => {
        const myQnas = response.data.filter((qna) => qna.userId === user.id);
        setFilteredQnas(myQnas);
      })
      .catch((error) => {
        console.error("Error fetching qas: ", error);
      });
  };

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

  const handleMyQnas = () => {
    setShowMyQnas(!showMyQnas);
    if (!showMyQnas) {
      fetchMyQnas();
    } else {
      fetchQnas();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 w-full">
      {/* Top Bar */}
      <div className="w-full bg-white shadow-lg fixed top-0 z-10 h-20">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center p-4">
          <img
            src={exampleImage}
            alt="Example"
            className="w-55 h-14 object-cover mb-2 rounded"
          />
          <div className="flex-grow"></div>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="검색어를 입력하세요"
            />
            <FiSearch className="text-3xl text-gray-700" />
          </div>
        </div>
      </div>

      {/* QnA 목록 및 새 질문 버튼 영역 */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4 mt-10">
        <button
          onClick={handleMyQnas}
          className="bg-pink-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-pink-600 transition-colors flex items-center"
        >
          <FaUser className="mr-2" />
          <span>{showMyQnas ? "All QnAs" : "My QnAs"}</span>
        </button>
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <FaPlus className="mr-2" />
          <span>추가하기</span>
        </button>
      </div>

      {/* QnA 목록 */}
      <div className="max-w-screen-lg mx-auto pt-24 px-4">
        <div className="bg-white rounded-lg border-t border-gray-300 max-w-full mx-auto p-8 divide-y divide-gray-300">
          <QnaList user={user} Qnas={filteredQnas} handleDelete={() => {}} />
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors z-20"
      >
        <FaSyncAlt className="text-2xl" />
      </button>
    </div>
  );
};

export default QnA;
