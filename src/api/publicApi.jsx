import axios from "axios";

// API 기본 URL 설정
// const API_URL = "http://127.0.0.1:8080/api";
const API_URL = "http://3.38.115.167:8080/api";

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;