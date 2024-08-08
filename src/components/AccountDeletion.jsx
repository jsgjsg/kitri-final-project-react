import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const AccountDeletion = () => {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    // TODO: Implement the deletion logic
    api.delete("/auth/delete")
    .then(response => {
      console.log(response.data);
      alert('회원 탈퇴가 완료되었습니다.');
      navigate("/login");
    })
    .catch((error) => {
      console.error("Error fetching profile: ", error);
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">회원 탈퇴</h1>
        <p className="mb-4">이 작업은 되돌릴 수 없습니다. 정말로 계정을 탈퇴하시겠습니까?</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setConfirming(true)}
        >
          탈퇴
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          onClick={() => {
            alert('탈퇴 취소되었습니다.');
            navigate(-1);
          }}
        >
          취소
        </button>

        {confirming && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <p className="mb-4">정말로 탈퇴하시겠습니까? 이 작업은 취소할 수 없습니다.</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleDelete}
            >
              예, 탈퇴합니다
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={() => setConfirming(false)}
            >
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDeletion;
