import React, { useRef, useEffect } from "react";

const BasicMap = () => {
  const mapElement = useRef(null);

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

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">네이버 지도</h1>
      <div
        ref={mapElement}
        className="w-[800px] h-[600px] border-2 border-gray-300 mb-6"
      />
    </div>
  );
};

export default BasicMap;
