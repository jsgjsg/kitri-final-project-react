import React, { useState, useEffect, useCallback } from "react";
import ReviewFilter from "../review/ReviewFilter";
import ReviewList from "../review/ReviewList";
import api from "../../api/api";
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
  const [currentIndex, setCurrentIndex] = useState(0); // 단일 리뷰 모드에서 현재 리뷰 인덱스
  const [keyword, setKeyword] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showMyreviews, setShowMyreviews] = useState(false);
  const [columns, setColumns] = useState(3); // 기본적으로 3줄 보기로 설정
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
      .get("http://127.0.0.1:8080/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const fetchMyReviews = () => {
    api
      .get("http://127.0.0.1:8080/api/reviews")
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

  const handleAddreview = () => {
    navigate("/review/form");
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
      {/* Top Bar */}
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
      {/* My Reviews and Add Review Buttons */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4 mt-10">
        <button
          className="bg-pink-500 text-white px-3 py-2 text-lg rounded-lg hover:bg-pink-600 transition-colors flex items-center mr-10"
          onClick={handleMyreviews}
        >
          <FaUser className="mr-2" />
          <span>{showMyreviews ? "All Reviews" : "My Reviews"}</span>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          onClick={handleAddreview}
        >
          <FaPlus className="mr-2" />
          <span>추가하기</span>
        </button>
      </div>
      {/* Refresh Button */}
      <button
        className="fixed bottom-10 right-10 bg-purple-500 text-white p-4 rounded-full hover:bg-purple-600 transition-colors z-20"
        onClick={handleRefresh}
      >
        <FaSyncAlt className="text-2xl" />
      </button>
      {/* Navigation Arrows */}
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
      {/* Main Content */}
      <div className="max-w-screen-lg mx-auto pt-24 px-4">
        {columns === 1 ? (
          reviews.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-8 h-4/5 flex flex-col justify-center items-center transition duration-100">
              <h3 className="text-2xl font-semibold mb-4">
                {reviews[currentIndex].reviewWithUser.item}
              </h3>
              {reviews[currentIndex].reviewWithUser.image && (
                <img
                  src={reviews[currentIndex].reviewWithUser.image}
                  alt="Review Image"
                  className="w-full h-64 object-contain mb-4 rounded"
                />
              )}
              <p className="text-gray-700 mb-4">
                <strong>Good:</strong>{" "}
                {reviews[currentIndex].reviewWithUser.good}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Bad:</strong> {reviews[currentIndex].reviewWithUser.bad}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Tip:</strong> {reviews[currentIndex].reviewWithUser.tip}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Repurchase:</strong>{" "}
                {reviews[currentIndex].reviewWithUser.repurchase ? "Yes" : "No"}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Satisfaction:</strong>{" "}
                {reviews[currentIndex].reviewWithUser.satisfaction}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Animal:</strong>{" "}
                {reviews[currentIndex].reviewWithUser.animal}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Category:</strong>{" "}
                {reviews[currentIndex].reviewWithUser.category}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {reviews[currentIndex].reviewWithUser.createdAt}
              </p>
              <div className="flex justify-end mt-4">
                <button className="flex items-center text-red-500 p-4 hover:bg-red-100 rounded transition-colors mr-4">
                  {reviews[currentIndex].liked ? <FaHeart /> : <FaRegHeart />}
                  {reviews[currentIndex].likeCount && (
                    <span className="ml-2">
                      {reviews[currentIndex].likeCount}
                    </span>
                  )}
                </button>
                <button className="flex items-center text-green-500 p-4 hover:bg-green-100 rounded transition-colors">
                  <FaComments />
                </button>
              </div>
            </div>
          )
        ) : (
          <ReviewList user={user} reviews={reviews} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Review;
