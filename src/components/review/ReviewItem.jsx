// ReviewItem.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewComment from "./ReviewComment";
import {
  FaComments,
  FaEdit,
  FaPlus,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import api from "../../api/api"; // api 객체 추가

const ReviewItem = ({ user, review, columns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [liked, setLiked] = useState(false); // liked 상태 추가
  const [likeCount, setLikeCount] = useState(0); // likeCount 상태 추가
  const navigate = useNavigate();
  const { reviewWithUser } = review;

  useEffect(() => {
    setLiked(review.liked);
    setLikeCount(review.likeCount);
  }, [review]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateButton = () => {
    navigate("/review/form");
  };

  const handleUpdateButton = () => {
    navigate(`/review/form/${reviewWithUser.id}`, {
      state: { reviewWithUser },
    });
  };

  useEffect(() => {
    if (!isMe && user.id === reviewWithUser.userId) {
      setIsMe(true);
    }
  }, [user.id, reviewWithUser.userId, isMe]);

  const handleLikeToggle = () => {
    const newLiked = !liked;

    api
      .post(`/reviews/${reviewWithUser.id}/like`)
      .then((response) => {
        setLikeCount(response.data);
        setLiked(newLiked);
      })
      .catch((error) => {
        console.error("Error toggling like: ", error);
      });
  };

  return (
    <div
      className={`relative p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-lg ${
        columns === 1 ? "w-full max-w-md h-150" : "w-full"
      } transition duration-100`}
    >
      {isMe ? (
        <button
          onClick={handleUpdateButton}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaEdit />
        </button>
      ) : (
        <button
          onClick={handleCreateButton}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaPlus />
        </button>
      )}
      <h3 className="text-lg font-semibold truncate mb-2">
        {reviewWithUser.userId}
      </h3>
      {reviewWithUser.image && (
        <img
          src={reviewWithUser.image}
          alt="Review Image"
          className={`w-full h-64 object-contain mb-2 rounded ${
            columns === 1 ? "w-full h-64" : "w-full"
          }`}
        />
      )}
      <p className="text-gray-700 mb-2 text-sm">
        <strong>item:</strong>
        {reviewWithUser.item}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Good:</strong> {reviewWithUser.good}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Bad:</strong> {reviewWithUser.bad}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Tip:</strong> {reviewWithUser.tip}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Repurchase:</strong> {reviewWithUser.repurchase ? "Yes" : "No"}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Satisfaction:</strong> {reviewWithUser.satisfaction}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Animal:</strong> {reviewWithUser.animal}
      </p>
      <p className="text-gray-700 mb-2 text-sm">
        <strong>Category:</strong> {reviewWithUser.category}
      </p>
      <p className="text-gray-500 text-xs mb-2">{reviewWithUser.created_at}</p>
      <div className="flex justify-end mt-2">
        <button
          onClick={handleLikeToggle}
          className="flex items-center space-x-1 text-red-500 p-2 rounded transition-colors mr-3 hover:bg-red-200"
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="ml-1">{likeCount}</span>
        </button>
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-1 text-green-500 p-2 rounded hover:bg-green-200 transition-colors"
        >
          <FaComments />
        </button>
      </div>
      {isModalOpen && (
        <ReviewComment
          reviewId={reviewWithUser.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReviewItem;
