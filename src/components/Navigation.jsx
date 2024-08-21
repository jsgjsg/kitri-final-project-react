import React, { useRef, useEffect, useState } from "react";
import exampleImage from "../assets/images/example.jpg";
import { FiSearch } from "react-icons/fi";
import api from "../api/api";

const cityCoordinates = {
  "서울특별시": { lat: 37.5665, lng: 126.978, zoom: 11 },
  "대구광역시": { lat: 35.8714, lng: 128.6014, zoom: 12 },
  "대전광역시": { lat: 36.3504, lng: 127.3845, zoom: 12 },
  "강원도": { lat: 37.9, lng: 127.876, zoom: 10 },
  "전라남도": { lat: 35.1, lng: 127, zoom: 9 },
  "경기도": { lat: 37.4565, lng: 126.95, zoom: 9 },
  "인천광역시": { lat: 37.4663, lng: 126.7052, zoom: 11 },
  "충청남도": { lat: 36.6359, lng: 126.6608, zoom: 9 },
  "광주광역시": { lat: 35.1595, lng: 126.8526, zoom: 12 },
  "전라북도": { lat: 35.3762, lng: 127.1342, zoom: 10 },
  "세종특별자치시": { lat: 36.4804, lng: 127.2899, zoom: 12 },
  "경상남도": { lat: 35.1372, lng: 128.5907, zoom: 9 },
  "경상북도": { lat: 36.4919, lng: 128.8889, zoom: 8 },
  "부산광역시": { lat: 35.1796, lng: 129.0256, zoom: 11 },
};

const BasicMap = () => {
  const mapElement = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [markersData, setMarkersData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커 배열 관리

  useEffect(() => {
    api
      .get(`/navigate/animal-hospital?city=${selectedCity}`)
      .then((response) => {
        console.log(response.data);
        setMarkersData(response.data); // API 데이터가 markersData에 저장됨
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedCity]);

  useEffect(() => {
    const { naver } = window;
    if (!naver) return; // 네이버 지도 API가 로드되지 않은 경우

    const mapOptions = {
      center: new naver.maps.LatLng(36.7, 127.8),
      zoom: 8, // 초기 줌 레벨
    };

    const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
    setMapInstance(mapInstance); // mapInstance 상태 업데이트

    return () => {
      // Cleanup: 지도 인스턴스가 더 이상 필요하지 않을 때 리소스를 해제할 수 있습니다.
    };
  }, []);

  useEffect(() => {
    if (mapInstance && markersData.length >= 0) {
      const { lat, lng, zoom } = cityCoordinates[selectedCity] || {lat: 36.7, lng: 127.8, zoom: 8};

      // 먼저 줌과 센터를 설정
      mapInstance.setCenter(new naver.maps.LatLng(lat, lng));
      mapInstance.setZoom(zoom);

      const infoWindow = new naver.maps.InfoWindow({
        anchorColor: "#333",
        anchorSize: new naver.maps.Size(20, 10),
        maxWidth: 200,
      });

      // 기존 마커 제거
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]); // 마커 배열 초기화

      // 마커 생성 및 추가 (API 데이터 기반으로)
      const newMarkers = markersData.map((data) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(data.fcltyLa, data.fcltyLo),
          map: mapInstance,
          title: data.fcltyNm,
        });

        // 마커 클릭 이벤트 리스너 추가
        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.setContent(`
            <div class="p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-w-xs">
              <h4 class="text-lg font-semibold text-gray-800 mb-2">${data.fcltyNm}</h4>
              <p class="text-gray-600">${data.rdnmadrNm}</p>
            </div>
          `);
          infoWindow.open(mapInstance, marker);
        });

        return marker;
      });

      // 새로 생성한 마커 배열로 교체
      setMarkers(newMarkers);

      // 지도에 빈 곳 클릭시 InfoWindow 닫기
      naver.maps.Event.addListener(mapInstance, "click", () => {
        infoWindow.close();
      });
    }
  }, [markersData, selectedCity, mapInstance]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
            {/* 필터 select 추가 */}
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">도시 선택</option>
              <option value="서울특별시">서울특별시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="강원도">강원도</option>
              <option value="전라남도">전라남도</option>
              <option value="경기도">경기도</option>
              <option value="인천광역시">인천광역시</option>
              <option value="충청남도">충청남도</option>
              <option value="광주광역시">광주광역시</option>
              <option value="전라북도">전라북도</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
              <option value="부산광역시">부산광역시</option>
            </select>
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
      <div className="max-w-6xl mx-auto pt-28 p-8 h-full flex flex-col items-center space-y-6">
        <div
          ref={mapElement}
          className="w-[800px] h-[600px] border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default BasicMap;
