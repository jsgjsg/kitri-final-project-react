import React, { useState, useEffect } from "react";
import ReviewCommentForm from "./ReviewCommentForm";
import ReviewCommentList from "./ReviewCommentList";
import api from "../api/api";
import { FaTimes } from "react-icons/fa";

const ReviewComment = ({ reviewId, isOpen, onClose }) => {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
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
      .get(`/reviews/${reviewId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [reviewId]);

  const handleSubmitComment = (newComment) => {
    const comment = { content: newComment, reviewId, userId: user.id };

    api
      .post(`/reviews/${reviewId}/comments`, comment)
      .then((response) => {
        console.log(response.data);
        setComments([...comments, comment]);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleDelete = (commentId) => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (isConfirmed) {
      api
        .delete(`/reviews/${reviewId}/comments/${commentId}`)
        .then(() => {
          setComments(comments.filter((comment) => comment.id !== commentId));
          console.log("Comment deleted: ", commentId);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md border-2 border-black font-doodle">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <ReviewCommentForm onSubmit={handleSubmitComment} />
        <br />
        <ReviewCommentList comments={comments} onDelete={handleDelete} />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white p-2 rounded-md border-2 border-black hover:bg-red-600 transition-colors flex items-center"
          >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewComment;
