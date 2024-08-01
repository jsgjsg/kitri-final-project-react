import React, { useState, useEffect } from "react";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import api from "../api/api";
import exampleImage from "../assets/images/example.jpg";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api
      .get("http://127.0.0.1:8080/api/reviews")
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <div className="flex items-center justify-between w-full mb-4">
        <img
          src={exampleImage}
          alt="Example"
          className="w-100 h-20 object-cover mb-2 rounded"
        />
        <div className="flex items-center space-x-4">
          <ReviewFilter />
        </div>
      </div>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Review;
