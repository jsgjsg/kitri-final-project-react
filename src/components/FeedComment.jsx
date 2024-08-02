import React, { useState } from "react";
import FeedCommentForm from "./FeedCommentForm";
import FeedCommentList from "./FeedCommentList";
import { FaTimes } from "react-icons/fa";
import api from "../api/api";
import { useEffect } from "react";

const FeedComment = ({ feedId, isOpen, onClose }) => {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api
      .get(`/users/me`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    api
      .get(`/feeds/${feedId}/comments`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedComments: ", error);
      });
  }, []);

  const handleSubmitComment = (newComment) => {
    const comment = { content: newComment, feedId, userId: user.id };

    api
      .post(`feeds/${feedId}/comments`, comment)
      .then((response) => {
        console.log(response.data);

        setComments([...comments, comment]);
      })
      .catch((error) => {
        console.error("Error fetching feedComments: ", error);
      });
  };

  const handleDelete = (commentId) => {
    // 사용자에게 삭제 확인 메시지를 표시
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

    // 사용자가 "확인"을 클릭한 경우에만 삭제 작업 수행
    if (isConfirmed) {
      api
        .delete(`/feeds/${feedId}/comments/${commentId}`)
        .then(() => {
          setComments(comments.filter((comment) => comment.id !== commentId));
          console.log("Comment deleted: ", commentId);
        })
        .catch((error) => {
          console.error("Error deleting comment: ", error);
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md border-2 border-black font-doodle">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <FeedCommentForm onSubmit={handleSubmitComment} />
        <br />
        <FeedCommentList onDelete={handleDelete} comments={comments} />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-yellow-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors flex items-center"
          >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedComment;
