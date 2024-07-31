import React from 'react';
import { useNavigate } from 'react-router-dom';

const QnaItem = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/qna/detail');
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      <h2>QnaItem 페이지</h2>
      <div className="mb-4">
        <div>작성자</div>
        <button
          onClick={handleTitleClick}
          className="text-blue-500 hover:underline"
        >
          제목
        </button>
      </div>
    </div>
  );
}

export default QnaItem;
