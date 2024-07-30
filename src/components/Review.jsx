import axios from "axios";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import api from "../api/api";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews")
      .then(response => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      Review 페이지
      <ReviewFilter />
      <ReviewList reviews = {reviews} />
    </div>
  );
}

export default Review;
