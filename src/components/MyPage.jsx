import React from 'react';

const MyPage = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      <h2 className="text-xl font-bold mb-4">MyPage 페이지</h2>
      <div className="mb-2">
        <strong>이름:</strong> 사용자 이름
      </div>
      <div className="mb-4">
        <strong>한줄 소개:</strong> 한줄 소개 내용
      </div>
      <hr className="mb-4" />
      <div className="mb-2">
        <strong>친구:</strong> ? 명
      </div>
      <div className="mb-4">
        <strong>친구요청 보낸 사람:</strong> ? 명
      </div>
      <hr className="mb-4" />
      <div className="space-y-2">
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          My 게시글
        </button>
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          My 댓글
        </button>
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          My 제품후기
        </button>
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          My Dr.QnA
        </button>
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          회원 정보 수정
        </button>
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          Logout
        </button>
        <button className="w-5/6 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-auto block">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}

export default MyPage;
