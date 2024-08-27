import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewComment from "./ReviewComment";
import ReviewForm from "./ReviewForm";
import {
  FaComments,
  FaEdit,
  FaPlus,
  FaRegHeart,
  FaHeart,
  FaTrash,
} from "react-icons/fa";
import api from "../../api/api";

const ReviewItem = ({ user, review, columns }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const { reviewWithUser } = review;

  useEffect(() => {
    setLiked(review.liked);
    setLikeCount(review.likeCount);
  }, [review]);

  const handleOpenModal = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleCreateButton = () => {
    setIsReviewModalOpen(true);
  };

  const handleUpdateButton = () => {
    setIsReviewModalOpen(true);
  };

  const handleDeleteReview = () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      api
        .delete(`/reviews/${reviewWithUser.id}`)
        .then(() => {
          alert("리뷰가 삭제되었습니다.");
          window.location.reload(); // 페이지 새로고침
        })
        .catch((error) => {
          console.error("Error deleting review: ", error);
        });
    }
  };

  useEffect(() => {
    if (user && reviewWithUser && user.id === reviewWithUser.userId) {
      setIsMe(true); // 현재 유저가 이 피드를 소유하고 있는지 확인
    } else {
      setIsMe(false);
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
        <>
          <button
            onClick={handleUpdateButton}
            className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
          >
            <FaEdit />
          </button>
        </>
      ) : (
        <button
          onClick={handleCreateButton}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaPlus />
        </button>
      )}
      <h3 className="text-lg font-semibold truncate mb-2">
        {reviewWithUser.nickname}
      </h3>
      {reviewWithUser.image && (
        <img
          src={reviewWithUser.image}
          alt="Review Image"
          className={`w-full h-64 object-contain mb-4 rounded ${
            columns === 1 ? "w-full h-64" : "w-full"
          }`}
        />
      )}

      <div className="border-2 border-red-200 rounded-md p-3">
        <p className="font-semibold truncate mb-2">{reviewWithUser.item}</p>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-gray-700 text-sm">#{reviewWithUser.animal}</p>
          <p className="text-gray-700 text-sm">#{reviewWithUser.category}</p>

          <div className="flex items-center">
            {Array.from({ length: reviewWithUser.satisfaction }, (_, index) => (
              <FaHeart key={index} className="text-red-500 mr-1" />
            ))}
          </div>
          <p className="text-gray-700 text-sm">{reviewWithUser.repurchase}</p>
        </div>
      </div>
      {/* Review Sections */}
      {reviewWithUser.good && (
        <div className="mt-4">
          <p className="inline-block bg-red-200 text-gray-800 text-sm font-bold rounded-full px-3 py-1">
            이런점이 좋았어요
          </p>
          <div className="text-gray-700 text-sm mt-2">
            {reviewWithUser.good}
          </div>
        </div>
      )}

      {reviewWithUser.bad && (
        <div className="mt-4">
          <p className="inline-block bg-blue-200 text-gray-800 text-sm font-bold rounded-full px-3 py-1">
            아쉬워요 ...
          </p>
          <div className="text-gray-700 text-sm mt-2">{reviewWithUser.bad}</div>
        </div>
      )}

      {reviewWithUser.tip && (
        <div className="mt-4">
          <p className="inline-block bg-green-200 text-gray-800 text-sm font-bold rounded-full px-3 py-1">
            알아두면 좋은 팁
          </p>
          <div className="text-gray-700 text-sm mt-2">{reviewWithUser.tip}</div>
        </div>
      )}

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
      {isCommentModalOpen && (
        <ReviewComment
          reviewId={reviewWithUser.id}
          isOpen={isCommentModalOpen}
          onClose={handleCloseModal}
        />
      )}
      {isReviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <ReviewForm
            onClose={handleCloseReviewModal}
            isEditing={isMe}
            review={reviewWithUser}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
