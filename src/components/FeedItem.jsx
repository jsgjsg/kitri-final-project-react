import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedComment from './FeedComment';

const FeedItem = ({ feed }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    navigate(`/feed/form`); // FeedForm 페이지로 이동
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-md max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-2 truncate">작성자 : {feed.user_id}</h3>
      <h3 className="text-lg font-semibold mb-2 truncate">{feed.item}</h3>
      <img src={feed.image} alt={feed.item} className="w-full h-32 object-cover mb-2 rounded" />
      <p className="text-gray-700 mb-2 text-sm"><strong>Content:</strong> {feed.content}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Animal:</strong> {feed.animal}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Created_at:</strong> {feed.created_at}</p>
      <button
        onClick={handleButtonClick}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
      >
        Edit Feed
      </button>
      <button
        onClick={handleOpenModal}
        className="mt-4 ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors text-sm"
      >
        View Comments
      </button>

      {/* FeedComment 컴포넌트 */}
      <FeedComment isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default FeedItem;
