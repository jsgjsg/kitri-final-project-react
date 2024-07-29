import axios from "axios";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/reviews")
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
