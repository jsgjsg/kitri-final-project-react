import React, { useState, useEffect } from "react";
import {
  FaComments,
  FaEdit,
  FaPlus,
  FaHeart,
  FaRegHeart,
  FaTimes,
} from "react-icons/fa";
import Modal from "react-modal";
import api from "../../api/api";
import FeedForm from "./FeedForm";
import FeedComment from "./FeedComment";

Modal.setAppElement("#root");

const FeedItem = ({ user, feed, columns }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const {
    feedWithUser,
    likeCount: initialLikeCount,
    liked: initialLiked,
    feedHashtags,
  } = feed;
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setLiked(initialLiked);
    setLikeCount(initialLikeCount);
  }, [initialLiked, initialLikeCount]);

  useEffect(() => {
    // user와 feedWithUser가 제대로 로드된 후 비교하여 isMe 상태를 설정합니다.
    if (user && feedWithUser && user.id === feedWithUser.userId) {
      setIsMe(true); // 현재 유저가 이 피드를 소유하고 있는지 확인
    } else {
      setIsMe(false);
    }
  }, [user, feedWithUser]);

  const handleLikeToggle = () => {
    const newLiked = !liked;

    api
      .post(`/feeds/${feedWithUser.id}/like`, { liked: newLiked })
      .then((response) => {
        setLikeCount(response.data);
        setLiked(newLiked);
      })
      .catch((error) => {
        console.error("Error toggling like: ", error);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  return (
    <div
      className={`relative p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-lg w-full ${
        columns === 1 ? "max-w-md" : "max-w-xs"
      } h-150`}
    >
      {isMe && (
        <button
          onClick={handleOpenModal}
          className="absolute top-2 right-1 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          <FaEdit />
        </button>
      )}
      <h3 className="text-lg font-semibold truncate mb-2">
        {feedWithUser.nickname}
      </h3>
      {feedWithUser.image && (
        <img
          src={feedWithUser.image}
          alt="Feed Image"
          className={`w-full h-64 object-contain mb-2 rounded ${
            columns === 1 ? "w-full h-64" : "w-full"
          }`}
        />
      )}
      {feedHashtags && feedHashtags.length > 0 && (
        <div className="flex flex-wrap mb-2">
          {feedHashtags.map((tag, index) => (
            <span
              key={index}
              className="mr-2 mb-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
            >
              #{tag.hashtag}
            </span>
          ))}
        </div>
      )}
      {/* 스타일을 개선한 카테고리 섹션 */}
      <p className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md mb-2 inline-block">
        카테고리: {feedWithUser.animal || "없음"}
      </p>
      {/* 스타일을 개선한 내용 섹션 */}
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        <b>{feedWithUser.nickname}</b> {feedWithUser.content}
      </p>
      <p className="text-gray-500 text-xs mb-2">{feedWithUser.createdAt.replaceAll("T", " ")}</p>
      <div className="flex justify-end mt-2">
        <button
          onClick={handleLikeToggle}
          className="flex items-center space-x-1 text-red-500 p-2 rounded transition-colors mr-3 hover:bg-red-200"
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="ml-1">{likeCount}</span>
        </button>
        <button
          onClick={handleOpenCommentModal}
          className="flex items-center space-x-1 text-green-500 p-2 rounded hover:bg-green-200 transition-colors"
        >
          <FaComments />
        </button>
      </div>

      {isCommentModalOpen && (
        <FeedComment
          feedId={feedWithUser.id}
          isOpen={isCommentModalOpen}
          onClose={handleCloseCommentModal}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={isMe ? "Edit Feed" : "Add Feed"}
        className="w-96 mx-auto my-16 p-8 rounded-lg shadow-lg bg-white border-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // z-index 높이기
      >
        <FeedForm
          onClose={handleCloseModal}
          isEditing={isMe}
          feed={feedWithUser}
          feedHashtags={feedHashtags.map((tag) => tag.hashtag).join(" ")}
        />
      </Modal>
    </div>
  );
};

export default FeedItem;
