import React, { useState, useEffect } from "react";
import api from "../api/api";
import FeedList from "./FeedList";
import FeedFilter from "./FeedFilter";
import exampleImage from "../assets/images/example.jpg";
import { FaPlus, FaUser, FaArrowUp, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [feeds, setFeeds] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 추가

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

    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowScrollIcon(true);
      } else {
        setShowScrollIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddFeed = () => {
    navigate("/feed/form"); // Add Feed 버튼 클릭 시 /feed/form으로 이동
  };

  useEffect(() => {
    // ?query=검색어
    api
      .get(`/feeds/search?query=${keyword}&animal=${filter}`)
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feeds: ", error);
      });
  }, [keyword, filter]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md p-4">
        <div className="flex items-center justify-between w-full mb-4">
          <img
            src={exampleImage}
            alt="Example"
            className="w-100 h-20 object-cover mb-2 rounded"
          />

          <FeedFilter
            setKeyword={setKeyword}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <div className="flex justify-center space-x-8 mb-4">
          <button
            onClick={handleAddFeed}
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FaPlus className="mr-2" /> Add Feed
          </button>
          <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            <FaUser className="mr-2" /> My Feeds
          </button>
          <button
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={showScrollIcon ? handleScrollToTop : handleRefresh}
            aria-label={showScrollIcon ? "Scroll to top" : "Refresh"}
          >
            {showScrollIcon ? <FaArrowUp /> : <FaSyncAlt />}
          </button>
        </div>
      </div>
      <div className="pt-32">
        <FeedList user={user} feeds={feeds} />
      </div>
    </div>
  );
};

export default Feed;
