import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignature } from "react-icons/fa"; // 새로운 아이콘 추가

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("패스워드가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const checkUsernameAvailability = () => {
    if (!username) {
      setUsernameError("아이디를 입력해주세요.");
      setIsUsernameAvailable(false);
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8080/api/doctor/check-doctorname?doctorname=${username}`
      )
      .then((response) => {
        if (response.data) {
          setUsernameError("사용 가능한 아이디입니다.");
          setIsUsernameAvailable(true);
        } else {
          setUsernameError("이미 사용 중인 아이디입니다.");
          setIsUsernameAvailable(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        setUsernameError("아이디 중복 조회 서버 오류");
      });
  };

  const checkNicknameAvailability = () => {
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
      setIsNicknameAvailable(false);
      return;
    }
    axios
      .get(
        `http://127.0.0.1:8080/api/doctor/check-nickname?nickname=${nickname}`
      )
      .then((response) => {
        if (response.data) {
          setNicknameError("사용 가능한 닉네임입니다.");
          setIsNicknameAvailable(true);
        } else {
          setNicknameError("이미 사용 중인 닉네임입니다.");
          setIsNicknameAvailable(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        setNicknameError("닉네임 중복 조회 서버 오류");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    if (!isUsernameAvailable || !isNicknameAvailable) {
      alert("아이디 또는 닉네임을 확인해주세요.");
      return;
    }

    // 회원가입 처리 로직 추가
    const data = { username, password, nickname };

    axios
      .post("http://127.0.0.1:8080/api/doctor/signup", data)
      .then((response) => {
        console.log("Response: ", response.data);
        alert("회원가입 성공!");

        // 회원가입 성공 후 리다이렉트
        navigate("/login"); // 로그인 페이지로 이동
      })
      .catch((error) => {
        console.error("Error: ", error);
        alert("Registration failed");
      });
  };

  return (
    <div className="flex items-start justify-center pt-8 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border-4 border-black relative">
        <h2 className="text-2xl font-bold mb-4 text-center">DoctorSignup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-grow">
              <label
                htmlFor="username"
                className="block text-base font-medium text-gray-700"
              >
                <FaUser className="inline-block mr-1" /> 아이디
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="button"
              onClick={checkUsernameAvailability}
              className="mt-6 bg-pastel-blue text-black p-2 rounded-md border-2 border-black hover:bg-pastel-blue-light transition-colors"
            >
              중복 조회
            </button>
          </div>
          {usernameError && (
            <p className="text-red-500 text-sm">{usernameError}</p>
          )}
          <div className="flex items-center space-x-2">
            <div className="flex-grow">
              <label
                htmlFor="nickname"
                className="block text-base font-medium text-gray-700"
              >
                <FaSignature className="inline-block mr-1" /> 닉네임
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1 block w-full p-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="button"
              onClick={checkNicknameAvailability}
              className="mt-6 bg-pastel-green text-black p-2 rounded-md border-2 border-black hover:bg-pastel-green-light transition-colors"
            >
              중복 조회
            </button>
          </div>
          {nicknameError && (
            <p className="text-red-500 text-sm">{nicknameError}</p>
          )}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              <FaLock className="inline-block mr-1" /> 비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium text-gray-700"
            >
              <FaLock className="inline-block mr-1" /> 비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pastel-yellow text-black p-2 rounded-md border-2 border-black hover:bg-pastel-yellow-light transition-colors"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-pastel-gray text-black p-2 rounded-md border-2 border-black hover:bg-gray-600 transition-colors"
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
