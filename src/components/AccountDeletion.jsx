import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AccountDeletion = () => {
  const [confirming, setConfirming] = useState(false);
  const [deleted, setDeleted] = useState(false); // 탈퇴 완료 상태
  const navigate = useNavigate();

  const handleDelete = () => {
    api
      .delete("/auth/delete")
      .then((response) => {
        console.log(response.data);
        setDeleted(true); // 탈퇴 완료 상태로 변경
        setTimeout(() => {
          navigate("/login"); // 3초 후에 로그인 페이지로 이동
        }, 3000); // 3초 후에 페이지 이동
      })
      .catch((error) => {
        console.error("Error during account deletion: ", error);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transform -translate-y-24">
        {!confirming && !deleted && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600 text-center">
              회원 탈퇴
            </h1>
            <p className="mb-2 text-gray-700 text-center">
              이 작업은 되돌릴 수 없습니다.
            </p>

            <p className="mb-8 text-gray-700 text-center">
              {" "}
              정말로 계정을 탈퇴하시겠습니까?
            </p>

            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => setConfirming(true)}
              >
                탈퇴
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={() => {
                  alert("탈퇴 취소되었습니다.");
                  navigate(-1);
                }}
              >
                취소
              </button>
            </div>
          </>
        )}

        {confirming && !deleted && (
          <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
            <p className="text-xl font-bold mb-4 text-red-600 text-center">
              정말로 탈퇴하시겠습니까?
            </p>
            <p className="text-l mb-4 text-black text-center">
              이 작업은 취소할 수 없습니다.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                예, 탈퇴합니다
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={() => setConfirming(false)}
              >
                취소
              </button>
            </div>
          </div>
        )}

        {deleted && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              회원 탈퇴가 완료되었습니다.
            </h2>
            <p className="text-gray-700">
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDeletion;
