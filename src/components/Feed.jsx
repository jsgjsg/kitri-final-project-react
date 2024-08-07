import React, { useState, useEffect } from "react";
import api from "../api/api";
import FeedList from "./FeedList";
import FeedFilter from "./FeedFilter";
import exampleImage from "../assets/images/example.jpg";

const Feed = () => {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [feeds, setFeeds] = useState([]);
  const [keyword, setKeyword] = useState("");

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
    
      // ?query=검색어
    api
      .get(`/feeds`)
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feeds: ", error);
      });
  }, []);

  useEffect(() => {
      // ?query=검색어
    api
      .get(`/feeds/search?query=${keyword}`)
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feeds: ", error);
      });
  }, [keyword]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <div className="flex items-center justify-between w-full mb-4">
        <img
          src={exampleImage}
          alt="Example"
          className="w-100 h-20 object-cover mb-2 rounded"
        />
        <FeedFilter setKeyword={setKeyword} />
      </div>
      <FeedList user={user} feeds={feeds} />
    </div>
  );
};

export default Feed;
