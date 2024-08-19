import React, { useRef, useEffect, useState } from "react";

import exampleImage from "../assets/images/example.jpg";
import { FiSearch } from "react-icons/fi";
const BasicMap = () => {
  const mapElement = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const { naver } = window;
    if (!naver) return; // 네이버 지도 API가 로드되지 않은 경우

    const mapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.978), // 서울의 좌표
      zoom: 10, // 초기 줌 레벨
    };

    // 지도 인스턴스 생성
    const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);

    return () => {
      // 컴포넌트가 언마운트될 때, 이벤트 리스너 제거
      // if (mapInstance) {
      //   console.log(mapInstance);
      //   console.log(naver);
      //   naver.maps.Event.removeListener(mapInstance, "click");
      // }
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 여기서 검색어에 대한 동작을 정의합니다.
    console.log("검색어:", searchTerm);
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
            <FiSearch className="text-3xl text-gray-700 ml-4" />
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="max-w-6xl mx-auto pt-28 p-8 h-full flex flex-col items-center space-y-6">
        {/* 지도 */}

        <div
          ref={mapElement}
          className="w-[800px] h-[600px] border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default BasicMap;
