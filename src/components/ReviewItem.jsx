import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewItem = ({ review }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/review/form`); // ReviewForm 페이지로 이동
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-md max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-2 truncate">작성자 : {review.user_id}</h3>
      <h3 className="text-lg font-semibold mb-2 truncate">{review.item}</h3>
      <img src={review.image} alt={review.item} className="w-full h-32 object-cover mb-2 rounded" />
      <p className="text-gray-700 mb-2 text-sm"><strong>Good:</strong> {review.good}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Bad:</strong> {review.bad}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Tip:</strong> {review.tip}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Repurchase:</strong> {review.repurchase ? 'Yes' : 'No'}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Satisfaction:</strong> {review.satisfaction}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Animal:</strong> {review.animal}</p>
      <p className="text-gray-700 mb-2 text-sm"><strong>Category:</strong> {review.category}</p>
      <button
        onClick={handleButtonClick}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
      >
        Edit Review
      </button>
    </div>
  );
}

export default ReviewItem;
