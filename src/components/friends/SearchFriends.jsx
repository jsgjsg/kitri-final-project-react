import React, { useState } from "react";
import api from "../../api/api";

const SearchFriends = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchResult, setSearchResult] = useState(null); // 검색 결과 상태

  const handleSearch = () => {
    api
      .post("/friends/search-nickname", searchTerm) // 검색어를 API 요청에 사용
      .then((response) => {
        console.log(response.data);
        response.data.nickname != null
          ? setSearchResult(response.data)
          : setSearchResult(null); // 응답 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("검색 중 오류 발생:", error);
      });
  };

  // 친구 요청
  const handleAddFriend = (friendId) => {
    api
      .post("/friends/requests", friendId) // 친구 요청 API 호출
      .then((response) => {
        console.log(response.data);
        alert("친구 요청 완료"); // 요청이 성공하면 알림 표시
        
        setSearchTerm("");
        setSearchResult({...searchResult, relationship: "Sent"});
        // 친구 요청 후 검색 결과를 초기화하거나 업데이트할 수 있습니다.
      })
      .catch((error) => {
        console.error("친구 요청 중 오류 발생:", error);
        alert("친구 요청에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const getButtonText = (relationship) => {
    switch (relationship) {
      case "Friend":
        return "친구";
      case "Me":
        return "나";
      case "Sent":
        return "요청 보냄";
      case "Received":
        return "요청 받음";
      default:
        return "친구 추가";
    }
  };

  return (
    <div className="flex flex-col items-center w-full font-doodle relative bg-gray-100 p-6">
      <div className="flex flex-col items-center w-full max-w-2xl bg-white border-4 border-black rounded-md p-6 mt-24 mb-20">
        <h1 className="text-2xl font-bold mb-4">친구 검색</h1>

        {/* 검색 입력 필드 */}
        <div className="mb-6 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력 변경 시 상태 업데이트
            placeholder="친구 이름을 검색하세요"
            className="w-full p-3 border-2 border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            검색
          </button>
        </div>

        {/* 검색 결과 */}
        <div className="w-full">
          <ul className="list-none p-0 w-full space-y-4">
            {searchResult ? (
              <li
                key={searchResult.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src={searchResult.image || "https://via.placeholder.com/150"}
                      alt={searchResult.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold">{searchResult.nickname}</h4>
                    <p className="text-gray-500">"{searchResult.introduce}"</p>
                  </div>
                </div>
                <button
                  className={`${
                    searchResult.relationship === "Friend" || searchResult.relationship === "Me"
                      ? "text-gray-500"
                      : searchResult.relationship === "Sent"
                      ? "text-yellow-500"
                      : searchResult.relationship === "Received"
                      ? "text-green-500"
                      : "text-blue-500"
                  } hover:text-blue-700`}
                  onClick={() => {
                    if (searchResult.relationship !== "Nothing") {
                      return;
                    }
                    handleAddFriend(searchResult.id);
                  }}
                >
                  {getButtonText(searchResult.relationship)}
                </button>
              </li>
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchFriends;
