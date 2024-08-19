import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPaw } from "react-icons/fa"; // 새로운 아이콘 추가

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };

    axios
      .post("http://127.0.0.1:8080/api/doctor/login", data)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        alert("Login successful!");
        navigate("/feed");
      })
      .catch((error) => {
        console.error("Error: ", error);
        alert("Login failed");
      });
  };

  const handleSignUp = () => {
    navigate("/doctor/signup");
  };

  return (
    <div className="flex items-start justify-center h-screen bg-gray-100 pt-20">
      <div className="bg-white p-16 rounded-lg shadow-lg w-full max-w-xl border-4 border-black relative">
        <FaPaw className="text-4xl text-pink-500 absolute top-10 right-10" />{" "}
        {/* 발바닥 아이콘 위치 수정 */}
        <h2 className="text-3xl font-bold mb-8 text-center">DoctorLogin</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              <FaUser className="inline-block mr-2" /> Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 block w-full p-3 border-4 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              <FaLock className="inline-block mr-2" /> Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full p-3 border-4 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pastel-blue text-black p-3 rounded-md border-4 border-black hover:bg-pastel-blue-light transition-colors"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleSignUp}
          className="mt-6 w-full bg-pastel-gray text-black p-3 rounded-md border-4 border-black hover:bg-gray-600 transition-colors"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default DoctorLogin;
