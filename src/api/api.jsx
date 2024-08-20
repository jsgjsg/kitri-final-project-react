import axios from "axios";
import { useNavigate } from "react-router-dom";

// API 기본 URL 설정
const API_URL = "http://127.0.0.1:8080/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT 토큰을 가져오는 함수
const getToken = () => {
  return localStorage.getItem("jwtToken"); // 또는 다른 저장소에서 토큰을 가져올 수 있습니다
};

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let hasAlerted = false;

// 응답 인터셉터 추가 (선택 사항)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예를 들어, 401 Unauthorized 에러가 발생했을 때 로그아웃 처리
    if (error.response && error.response.status === 401) {
      // 로그아웃 처리 예: localStorage에서 토큰 삭제
      localStorage.removeItem("jwtToken");

      if (!hasAlerted) {
        hasAlerted = true;
        alert("접근 권한이 없습니다. 로그인 해주세요");
        // 로그인 페이지로 리디렉션
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
