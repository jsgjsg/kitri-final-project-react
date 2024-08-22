import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 JWT 토큰 확인
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-lg mb-6">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* 로그인 상태에 따른 버튼 렌더링 */}
      {isLoggedIn ? (
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white text-lg font-semibold rounded-lg shadow-lg mb-6 transition-all duration-300 ease-in-out"
        >
          <FiHome className="mr-2" />
          Go to Home
        </Link>
      ) : (
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Sign up
          </Link>
        </div>
      )}

      <div className="mt-8 text-sm opacity-80">
        &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
      </div>
    </div>
  );
};

export default NotFound;
