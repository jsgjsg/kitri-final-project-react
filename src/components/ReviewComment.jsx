import React, { useEffect, useState } from "react";
import ReviewCommentForm from "./ReviewCommentForm";
import ReviewCommentList from "./ReviewCommentList";
import api from "../api/api.jsx";

const ReviewComment = ({ reviewId, isOpen, onClose }) => {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [comments, setComments] = useState([]);

  console.log(reviewId);

  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api.get(`/users/me`)
    .then((response) => {
      console.log(response.data);
      setUser(response.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    })

    api.get(`/reviews/${reviewId}/comments`)
    .then((response) => {
      setComments(response.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    })

  }, [])

  const handleSubmitComment = (newComment) => {
    console.log(newComment);
    console.log(comments);
    console.log(user);

    const comment = {content: newComment, reviewId, userId: user.id };

    api.post(`/reviews/${reviewId}/comments`, comment)
    .then((response) => {
      console.log(response.data);
      setComments([...comments, comment]);
    })
    .catch(error => {
      console.error("Error: ", error);
    })
  };

  const handleDelete = (commentId) => {
    // 사용자에게 삭제 확인 메시지를 표시
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    
    // 사용자가 "확인"을 클릭한 경우에만 삭제 작업 수행
    if (isConfirmed) {
      api.delete(`/reviews/${reviewId}/comments/${commentId}`)
        .then(() => {
          setComments(comments.filter(comment => comment.id !== commentId));
          console.log("Comment deleted: ", commentId);
        })
        .catch(error => {
          console.error("Error deleting comment: ", error);
        });
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <ReviewCommentForm onSubmit={handleSubmitComment} />
        <br />
        <ReviewCommentList onDelete={handleDelete} comments={comments} />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewComment;
