import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      setPasswordError("패스워드가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // Add logic to handle password update, e.g., API call
    console.log("New Password:", newPassword);

    api.put("/users/me/change-password", newPassword)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });

    // Simulating a successful update
    alert("비밀번호가 성공적으로 수정되었습니다.");
    navigate("/myPage");
  };

  return (
    <div className="flex items-start justify-center pt-8 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl w-[460px] border-4 border-black relative bottom-2">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          비밀번호 수정
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="새 비밀번호를 입력하세요"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              새 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 block w-full p-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="새 비밀번호를 다시 입력하세요"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg font-bold p-3 rounded-md hover:bg-blue-600 flex-1 transition-colors"
            >
              수정하기
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black text-lg font-bold p-3 rounded-md hover:bg-gray-400 flex-1 transition-colors"
              onClick={() => {
                navigate(-1);
              }}
            >
              수정 취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
