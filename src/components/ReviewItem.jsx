import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewComment from "./ReviewComment";
import { FaComments, FaPlus, FaRegHeart } from "react-icons/fa";

const ReviewItem = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    navigate("/review/form");
  };

  return (
    <div className="relative p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-lg w-full max-w-xs h-150">
      <button
        onClick={handleButtonClick}
        className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
      >
        <FaPlus />
      </button>
      <h3 className="text-lg font-semibold truncate mb-2">{review.item}</h3>
      <img
        src={review.image}
        alt={review.image}
        className="w-full h-64 object-cover mb-2 rounded"
      />
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Good:</strong> {review.good}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Bad:</strong> {review.bad}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Tip:</strong> {review.tip}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Repurchase:</strong> {review.repurchase ? "Yes" : "No"}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Satisfaction:</strong> {review.satisfaction}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Animal:</strong> {review.animal}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Category:</strong> {review.category}
      </p>
      <p className="text-gray-500 text-xs mb-2">{review.created_at}</p>
      <div className="flex justify-end mt-2">
        <button className="flex items-center space-x-1 text-red-500 p-2 rounded transition-colors mr-3 hover:bg-red-200">
          <FaRegHeart />
        </button>
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-1 text-green-500 p-2 rounded hover:bg-green-200 transition-colors"
        >
          <FaComments />
        </button>
      </div>
      {isModalOpen && (
        <ReviewComment isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ReviewItem;
