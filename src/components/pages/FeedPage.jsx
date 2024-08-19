import React, { useState, useEffect, useCallback } from "react";
import FeedFilter from "../feed/FeedFilter";
import FeedList from "../feed/FeedList";
import api from "../../api/api";
import Modal from "react-modal";
import FeedForm from "./../feed/FeedForm";
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

Modal.setAppElement("#root");

const Feed = () => {
  const [user, setUser] = useState({});
  const [feeds, setFeeds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showMyFeeds, setShowMyFeeds] = useState(false);
  const [columns, setColumns] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
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

    fetchFeeds();
  }, []);

  const fetchFeeds = () => {
    api
      .get("http://127.0.0.1:8080/api/feeds")
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const fetchMyFeeds = () => {
    api
      .get("http://127.0.0.1:8080/api/feeds")
      .then((response) => {
        const myFeeds = response.data.filter(
          (feed) => feed.feedWithUser.userId === user.id
        );
        setFeeds(myFeeds);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleAddFeed = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleMyFeeds = () => {
    setShowMyFeeds(!showMyFeeds);
    if (!showMyFeeds) {
      fetchMyFeeds();
    } else {
      fetchFeeds();
    }
  };

  useEffect(() => {
    api
      .get(
        `/feeds/search?query=${keyword}&animal=${animalFilter}&category=${categoryFilter}`
      )
      .then((response) => {
        setFeeds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feeds: ", error);
      });
  }, [keyword, animalFilter, categoryFilter]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleColumnChange = (numColumns) => {
    setColumns(numColumns);
  };

  const goToNextFeed = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feeds.length - 1 ? 0 : prevIndex + 1
    );
  }, [feeds.length]);

  const goToPreviousFeed = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feeds.length - 1 : prevIndex - 1
    );
  }, [feeds.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goToNextFeed();
      } else if (event.key === "ArrowLeft") {
        goToPreviousFeed();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextFeed, goToPreviousFeed]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 w-full overflow-auto">
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
            <FeedFilter
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
      {/* My Feeds and Add Feed Buttons */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4 mt-10 ">
        <button
          className="bg-pink-500 text-white px-3 py-2 text-lg rounded-lg hover:bg-pink-600 transition-colors flex items-center mr-10"
          onClick={handleMyFeeds}
        >
          <FaUser className="mr-2" />
          <span>{showMyFeeds ? "All Feeds" : "My Feeds"}</span>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          onClick={handleAddFeed}
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
            onClick={goToPreviousFeed}
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <button
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-4 rounded-full hover:bg-gray-300 transition-colors z-20"
            onClick={goToNextFeed}
          >
            <FaArrowRight className="text-2xl" />
          </button>
        </>
      )}
      {/* Main Content */}
      <div className="max-w-screen-lg mx-auto pt-24 px-4 h-full flex justify-center items-center">
        {columns === 1 ? (
          feeds.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto p-8 h-4/5 flex flex-col justify-center items-center transition duration-100">
              <h3 className="text-2xl font-semibold mb-4">
                {feeds[currentIndex].feedWithUser.nickname}
              </h3>
              {feeds[currentIndex].feedWithUser.image && (
                <img
                  src={feeds[currentIndex].feedWithUser.image}
                  alt="Feed Image"
                  className="w-full h-64 object-contain mb-4 rounded"
                />
              )}
              {feeds[currentIndex].feedHashtags &&
                feeds[currentIndex].feedHashtags.length > 0 && (
                  <div className="flex flex-wrap mb-2">
                    {feeds[currentIndex].feedHashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="mr-2 mb-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                      >
                        #{tag.hashtag}
                      </span>
                    ))}
                  </div>
                )}
              <p className="text-gray-700 mb-4">
                category : {feeds[currentIndex].feedWithUser.animal}
              </p>
              <p className="text-gray-700 mb-4">
                {feeds[currentIndex].feedWithUser.content}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {feeds[currentIndex].feedWithUser.createdAt}
              </p>
              <div className="flex justify-end mt-4">
                <button className="flex items-center text-red-500 p-4 hover:bg-red-100 rounded transition-colors mr-4">
                  {feeds[currentIndex].liked ? <FaHeart /> : <FaRegHeart />}
                  {feeds[currentIndex].likeCount && (
                    <span className="ml-2">
                      {feeds[currentIndex].likeCount}
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
          <FeedList user={user} feeds={feeds} columns={columns} />
        )}
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Feed Form"
        className="w-96 mx-auto my-16 p-8 rounded-lg shadow-lg border-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <FeedForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Feed;
