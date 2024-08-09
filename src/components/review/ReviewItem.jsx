import React, { useState } from "react";
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

const ReviewItem = ({ user, review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [liked, setLiked] = useState(review.initialLiked); // liked 상태 추가
  const [likeCount, setLikeCount] = useState(review.initialLikeCount); // likeCount 상태 추가
  const navigate = useNavigate();
  const {
    reviewWithUser,
    likeCount: initialLikeCount,
    liked: initialLiked,
  } = review;

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

  if (!isMe && user.id === reviewWithUser.userId) {
    setIsMe(true); // !isMe를 하지 않으면 무한 렌더링
    console.log(isMe);
  }

  const handleLikeToggle = () => {
    const newLiked = !liked;

    api
      .post(`/feeds/${reviewWithUser.id}/like`, { liked: newLiked })
      .then((response) => {
        setLikeCount(response.data);
        setLiked(newLiked);
      })
      .catch((error) => {
        console.error("Error toggling like: ", error);
      });
  };

  return (
    <div className="relative p-4 border border-gray-300 rounded-md mb-4 bg-white shadow- w-full max-w-md h-150">
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
        {reviewWithUser.item}
      </h3>
      {reviewWithUser.image && (
        <img
          src={reviewWithUser.image}
          alt="Review Image"
          className="w-full h-64 object-contain mb-2 rounded"
        />
      )}
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
          {likeCount && <span className="ml-1">{likeCount}</span>}
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
