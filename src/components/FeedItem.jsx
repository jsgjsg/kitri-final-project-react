import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedComment from "./FeedComment";
import {
  FaComments,
  FaEdit,
  FaPlus,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import api from "../api/api";

const FeedItem = ({ user, feed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isMe, setIsMe] = useState(false);
  const {
    feedWithUser,
    likeCount: initialLikeCount,
    liked: initialLiked,
    feedHashtags,
  } = feed;
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateButton = () => {
    navigate("/feed/form");
  };

  const handleUpdateButton = () => {
    navigate(`/feed/form/${feedWithUser.id}`, {
      state: { feedWithUser, feedHashtags },
    });
  };

  if (!isMe && user.id === feedWithUser.userId) {
    setIsMe(true); // !isMe를 하지 않으면 무한 렌더링
  }

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

  return (
    <div className="relative p-2 border border-gray-300 rounded-md mb-4 bg-white shadow-lg w-full max-w-xs h-150">
      {isMe ? (
        <button
          onClick={handleUpdateButton}
          className="absolute top-2 right-1 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
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
        {feedWithUser.nickname}
      </h3>
      {feedWithUser.image && (
        <img
          src={feedWithUser.image}
          alt="Review Image"
          className="w-full h-64 object-contain mb-2 rounded"
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
      <p className="text-gray-700 mb-2 text-sm">
        category : {feedWithUser.animal}
      </p>
      <p className="text-gray-700 mb-2 text-sm">{feedWithUser.content}</p>
      <p className="text-gray-500 text-xs mb-2">{feedWithUser.createdAt}</p>
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
        <FeedComment
          feedId={feedWithUser.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FeedItem;
