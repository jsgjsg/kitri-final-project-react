import React, { useState, useEffect, useCallback } from "react";
import ReviewFilter from "../review/ReviewFilter";
import ReviewList from "../review/ReviewList";
import api from "../../api/api";
import Modal from "react-modal";
import ReviewForm from "../review/ReviewForm";
import {
  FaPlus,
  FaUser,
  FaSyncAlt,
  FaArrowLeft,
  FaArrowRight,
  FaComments,
  FaTh,
  FaThList,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import exampleImage from "../../assets/images/example.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Review = () => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showMyreviews, setShowMyreviews] = useState(false);
  const [columns, setColumns] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [currentReview, setCurrentReview] = useState(null); // 수정하려는 리뷰 상태
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/users/me`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    fetchReviews();
  }, []);

  const fetchReviews = () => {
    api
      .get("/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const fetchMyReviews = () => {
    api
      .get("/reviews")
      .then((response) => {
        const myReviews = response.data.filter(
          (review) => review.reviewWithUser.userId === user.id
        );
        setReviews(myReviews);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleAddReview = () => {
    setIsEditing(false); // 새 리뷰를 추가할 때는 수정 모드가 아님
    setCurrentReview(null); // 수정할 리뷰 없음
    setIsModalOpen(true); // 모달 열기
  };

  const handleEditReview = (review) => {
    setIsEditing(true); // 수정 모드로 설정
    setCurrentReview(review); // 수정하려는 리뷰 설정
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleMyreviews = () => {
    setShowMyreviews(!showMyreviews);
    if (!showMyreviews) {
      fetchMyReviews();
    } else {
      fetchReviews();
    }
  };

  useEffect(() => {
    api
      .get(
        `/reviews/search?query=${keyword}&animal=${animalFilter}&category=${categoryFilter}`
      )
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  }, [keyword, animalFilter, categoryFilter]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const goToNextReview = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  }, [reviews.length]);

  const goToPreviousReview = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  }, [reviews.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goToNextReview();
      } else if (event.key === "ArrowLeft") {
        goToPreviousReview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextReview, goToPreviousReview]);

  const handleColumnChange = (numColumns) => {
    setColumns(numColumns);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 w-full">
      {/* 상단 바 */}
      <div className="w-full bg-white shadow-lg fixed top-0 z-10 h-20">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center p-4">
          <img
            src={exampleImage}
            alt="Example"
            className="w-55 h-14 object-cover mb-2 rounded"
          />
          <div className="flex-grow"></div>
          <div className="flex space-x-4 items-center">
            <ReviewFilter
              setKeyword={setKeyword}
              setAnimalFilter={setAnimalFilter}
              setCategoryFilter={setCategoryFilter}
            />
            <button onClick={() => handleColumnChange(1)} className="p-2">
              <FaBars />
            </button>
            <button onClick={() => handleColumnChange(2)} className="p-2">
              <FaThList />
            </button>
            <button onClick={() => handleColumnChange(3)} className="p-2">
              <FaTh />
            </button>
          </div>
        </div>
      </div>
      {/* 내 리뷰 및 리뷰 추가 버튼 */}
      {!isModalOpen && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4 mt-10">
          <button
            className="bg-pink-500 text-white px-3 py-2 text-lg rounded-lg hover:bg-pink-600 transition-colors flex items-center mr-10"
            onClick={handleMyreviews}
          >
            <FaUser className="mr-2" />
            <span>{showMyreviews ? "전체 리뷰" : "내 리뷰"}</span>
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            onClick={handleAddReview}
          >
            <FaPlus className="mr-2" />
            <span>추가하기</span>
          </button>
        </div>
      )}

      {/* 새로고침 버튼 */}
      <button
        className="fixed bottom-10 right-10 bg-purple-500 text-white p-4 rounded-full hover:bg-purple-600 transition-colors z-20"
        onClick={handleRefresh}
      >
        <FaSyncAlt className="text-2xl" />
      </button>
      {/* 네비게이션 화살표 */}
      {columns === 1 && (
        <>
          <button
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-4 rounded-full hover:bg-gray-300 transition-colors z-20"
            onClick={goToPreviousReview}
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <button
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-4 rounded-full hover:bg-gray-300 transition-colors z-20"
            onClick={goToNextReview}
          >
            <FaArrowRight className="text-2xl" />
          </button>
        </>
      )}
      {/* 메인 컨텐츠 */}
      <div className="max-w-screen-lg mx-auto pt-24 px-4">
        <ReviewList
          user={user}
          reviews={reviews}
          columns={columns}
          onEditReview={handleEditReview} // ReviewList에서 수정 모드로 들어갈 수 있도록 설정
        />
      </div>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Review Form"
        className="w-96 mx-auto my-16 p-8 rounded-lg shadow-lg border-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <ReviewForm
          onClose={closeModal}
          isEditing={isEditing}
          review={currentReview} // 수정하려는 리뷰 전달
        />
      </Modal>
    </div>
  );
};

export default Review;
