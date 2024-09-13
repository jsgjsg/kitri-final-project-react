import axios from "axios";

// API 기본 URL 설정
// const API_URL = "http://127.0.0.1:8080/api";
const API_URL = "http://43.203.217.13:8080/api";
// const API_URL = "http://my-first-elb-1013166709.ap-northeast-2.elb.amazonaws.com/api";

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;