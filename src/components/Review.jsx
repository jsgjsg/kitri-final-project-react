import React, { useState, useEffect } from "react";
import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import api from "../api/api";
import exampleImage from "../assets/images/example.jpg";

const Review = () => {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [reviews, setReviews] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

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
      .get("http://127.0.0.1:8080/api/reviews")
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  useEffect(() => {
    api
      .get(
        `/reviews/search?query=${keyword}&animal=${animalFilter}&category=${categoryFilter}`
      )
      .then((response) => {
        setReviews(response.data);
        console.log(`${animalFilter}`);
        console.log(`${categoryFilter}`);
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  }, [keyword, animalFilter, categoryFilter]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <div className="flex items-center justify-between w-full mb-4">
        <img
          src={exampleImage}
          alt="Example"
          className="w-100 h-20 object-cover mb-2 rounded"
        />
        <div className="flex items-center space-x-4">
          <ReviewFilter
            setKeyword={setKeyword}
            setAnimalFilter={setAnimalFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      </div>
      <ReviewList user={user} reviews={reviews} />
    </div>
  );
};

export default Review;
