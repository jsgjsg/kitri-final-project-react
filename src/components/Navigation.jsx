// import { useRef, useEffect, useState } from "react";

// const Navigation = () => {
//   const mapElement = useRef(null);
//   const [searchAddress, setSearchAddress] = useState("");
//   const [map, setMap] = useState(null); // 상태로 관리
//   const [infoWindow, setInfoWindow] = useState(null);

//   useEffect(() => {
//     const { naver } = window;
//     if (!naver) return;

//     const mapOptions = {
//       center: new naver.maps.LatLng(37.5665, 126.978), // 지도 초기 위치 설정 (서울)
//       zoom: 10,
//       mapTypeControl: true, // 지도 유형 컨트롤 표시
//     };

//     // `map` 객체를 상태로 설정
//     const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
//     setMap(mapInstance);

//     mapInstance.setCursor("pointer");

//     // 마커 추가 예제
//     new naver.maps.Marker({
//       position: new naver.maps.LatLng(37.5665, 126.978),
//       map: mapInstance,
//     });

//     // `infoWindow` 객체를 상태로 설정
//     const infoWindowInstance = new naver.maps.InfoWindow({
//       anchorSkew: true,
//     });
//     setInfoWindow(infoWindowInstance);

//     initGeocoder(mapInstance);

//     // Cleanup function to remove event listeners when component unmounts
//     return () => {
//       naver.maps.Event.removeListener(mapInstance, "click");
//     };
//   }, []);

//   const searchCoordinateToAddress = (latlng) => {
//     if (!map || !infoWindow) return; // `map`과 `infoWindow` 객체가 없는 경우 처리

//     infoWindow.close();

//     naver.maps.Service.reverseGeocode(
//       {
//         coords: latlng,
//         orders: [
//           naver.maps.Service.OrderType.ADDR,
//           naver.maps.Service.OrderType.ROAD_ADDR,
//         ].join(","),
//       },
//       (status, response) => {
//         if (status === naver.maps.Service.Status.ERROR) {
//           return alert("Something Wrong!");
//         }

//         const items = response.v2.results;
//         const htmlAddresses = items.map((item, index) => {
//           const address = makeAddress(item) || "";
//           const addrType =
//             item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";
//           return `${index + 1}. ${addrType} ${address}`;
//         });

//         infoWindow.setContent(`
//         <div style="padding:10px;min-width:200px;line-height:150%;">
//           <h4 style="margin-top:5px;">검색 좌표</h4><br />
//           ${htmlAddresses.join("<br />")}
//         </div>
//       `);

//         infoWindow.open(map, latlng);
//       }
//     );
//   };

//   const searchAddressToCoordinate = (address) => {
//     if (!address || address === "" || !map || !infoWindow) return; // `map`과 `infoWindow` 객체가 없는 경우 처리

//     naver.maps.Service.geocode(
//       {
//         query: address,
//       },
//       (status, response) => {
//         if (status === naver.maps.Service.Status.ERROR) {
//           return alert("Something Wrong!");
//         }

//         if (response.v2.meta.totalCount === 0) {
//           return alert("totalCount: " + response.v2.meta.totalCount);
//         }

//         const item = response.v2.addresses[0];
//         const point = new naver.maps.Point(item.x, item.y);

//         const htmlAddresses = [];
//         if (item.roadAddress) {
//           htmlAddresses.push("[도로명 주소] " + item.roadAddress);
//         }
//         if (item.jibunAddress) {
//           htmlAddresses.push("[지번 주소] " + item.jibunAddress);
//         }
//         if (item.englishAddress) {
//           htmlAddresses.push("[영문명 주소] " + item.englishAddress);
//         }

//         infoWindow.setContent(`
//         <div style="padding:10px;min-width:200px;line-height:150%;">
//           <h4 style="margin-top:5px;">검색 주소 : ${address}</h4><br />
//           ${htmlAddresses.join("<br />")}
//         </div>
//       `);

//         map.setCenter(point);
//         infoWindow.open(map, point);
//       }
//     );
//   };

//   const initGeocoder = (mapInstance) => {
//     mapInstance.addListener("click", (e) => {
//       searchCoordinateToAddress(e.coord);
//     });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     searchAddressToCoordinate(searchAddress);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch(e);
//     }
//   };

//   const makeAddress = (item) => {
//     if (!item) return "";

//     const { name, region, land } = item;
//     const isRoadAddress = name === "roadaddr";

//     let [sido, sigugun, dongmyun, ri, rest] = ["", "", "", "", ""];

//     if (hasArea(region.area1)) {
//       sido = region.area1.name;
//     }
//     if (hasArea(region.area2)) {
//       sigugun = region.area2.name;
//     }
//     if (hasArea(region.area3)) {
//       dongmyun = region.area3.name;
//     }
//     if (hasArea(region.area4)) {
//       ri = region.area4.name;
//     }

//     if (land) {
//       if (hasData(land.number1)) {
//         if (hasData(land.type) && land.type === "2") {
//           rest += "산";
//         }
//         rest += land.number1;
//         if (hasData(land.number2)) {
//           rest += "-" + land.number2;
//         }
//       }

//       if (isRoadAddress) {
//         if (checkLastString(dongmyun, "면")) {
//           ri = land.name;
//         } else {
//           dongmyun = land.name;
//           ri = "";
//         }

//         if (hasAddition(land.addition0)) {
//           rest += " " + land.addition0.value;
//         }
//       }
//     }

//     return [sido, sigugun, dongmyun, ri, rest].join(" ");
//   };

//   const hasArea = (area) => !!(area && area.name && area.name !== "");
//   const hasData = (data) => !!(data && data !== "");
//   const checkLastString = (word, lastString) =>
//     new RegExp(lastString + "$").test(word);
//   const hasAddition = (addition) => !!(addition && addition.value);

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center p-4 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Navigation 페이지</h1>
//       <div className="w-full max-w-4xl mb-6">
//         <form className="flex space-x-4" onSubmit={handleSearch}>
//           <input
//             id="address"
//             type="text"
//             placeholder="주소를 입력하세요"
//             className="flex-grow p-2 border border-gray-300 rounded"
//             value={searchAddress}
//             onChange={(e) => setSearchAddress(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <button
//             id="submit"
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             검색
//           </button>
//         </form>
//       </div>
//       <div
//         ref={mapElement}
//         className="w-[800px] h-[600px] border-2 border-gray-300 mb-6"
//       />
//     </div>
//   );
// };

// export default Navigation;
