import React from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start justify-center pt-8 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl w-[450px] border-4 border-black relative bottom-2">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          비밀번호 수정
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="old password"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              현재 비밀번호
            </label>
            <input
              type="password"
              id="old password"
              name="old password"
              className="mt-1 block w-full p-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="new password"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="new password"
              name="new password"
              className="mt-1 block w-full p-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="new password check"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              새 비밀번호 확인
            </label>
            <input
              type="password"
              id="new password check"
              name="new password check"
              className="mt-1 block w-full p-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
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
