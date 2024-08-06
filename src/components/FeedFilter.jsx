import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPaw, FaCat, FaDog } from "react-icons/fa";

const FeedFilter = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getIcon = () => {
    switch (filter) {
      case "cat":
        return <FaCat className="ml-2" />;
      case "dog":
        return <FaDog className="ml-2" />;
      default:
        return <FaPaw className="ml-2" />;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="검색..."
        className="p-2 border border-gray-300 rounded"
      />
      <button className="flex items-center space-x-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
        <AiOutlineSearch className="text-2xl" />
        <span>Search</span>
      </button>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="all">전체</option>
        <option value="cat">고양이</option>
        <option value="dog">강아지</option>
      </select>
      {getIcon()}
    </div>
  );
};

export default FeedFilter;
