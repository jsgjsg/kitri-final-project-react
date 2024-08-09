import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4">회원 정보 수정</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임 입력"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일 입력"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="introduce" className="block text-sm font-medium text-gray-700">자기소개</label>
            <textarea
              id="introduce"
              name="introduce"
              placeholder="자기소개 입력"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="4"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex-1"
            >
              수정하기
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400 flex-1"
              onClick={() => {navigate(-1)}}
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
