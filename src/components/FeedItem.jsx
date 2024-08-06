import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedComment from "./FeedComment";
import { FaComments, FaEdit, FaPlus, FaHeart, FaRegHeart } from "react-icons/fa"; // FaHeart 추가
import NoImage from "../assets/images/NoImage.jpg";
import api from "../api/api";

const FeedItem = ({ user, feed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isMe, setIsMe] = useState(false);
  const { feedWithUser, likeCount: initialLikeCount, liked: initialLiked } = feed; // initialLiked 추가
  const [liked, setLiked] = useState(initialLiked); // liked 상태 추가
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
    navigate(`/feed/form/${feedWithUser.id}`, { state: { feedWithUser } });
  };

  if(!isMe && user.id === feedWithUser.userId) {
    setIsMe(true); // !isMe를 하지 않으면 무한 렌더링
    console.log(isMe);
  }

  const handleLikeToggle = () => {
    // liked 상태를 토글합니다.
    const newLiked = !liked;

    // 서버에 좋아요 상태 업데이트 요청을 보냅니다.
    api
      .post(`/feeds/${feedWithUser.id}/like`, { liked: newLiked })
      .then((response) => {
        setLikeCount(response.data); // 좋아요 개수를 return받음

        // 좋아요 상태가 업데이트되면 로컬 상태도 업데이트합니다.
        setLiked(newLiked);
      })
      .catch((error) => {
        console.error("Error toggling like: ", error);
      });
  };

  return (
    <div className="relative p-4 border border-gray-300 rounded-md mb-4 bg-white shadow-lg w-full max-w-xs h-150">
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
      <h3 className="text-lg font-semibold truncate mb-2">{feedWithUser.nickname}</h3>
      <img
        src={feedWithUser.image || NoImage}
        alt={feedWithUser.image ? "Feed Image" : "No Image Available"}
        className="w-full h-64 object-cover mb-2 rounded"
      />
      <p className="text-gray-700 mb-2 text-sm">category : {feedWithUser.animal}</p>
      <p className="text-gray-700 mb-2 text-sm">{feedWithUser.content}</p>
      <p className="text-gray-500 text-xs mb-2">{feedWithUser.createdAt}</p>
      {/* created_at 필드 추가 */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleLikeToggle}
          className="flex items-center space-x-1 text-red-500 p-2 rounded transition-colors mr-3 hover:bg-red-200">
          { liked ? <FaHeart /> : <FaRegHeart /> }
          { likeCount && <span className="ml-1">{likeCount}</span> }
        </button>
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-1 text-green-500 p-2 rounded hover:bg-green-200 transition-colors"
        >
          <FaComments />
        </button>
      </div>
      {isModalOpen && (
        <FeedComment feedId={feedWithUser.id} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default FeedItem;
