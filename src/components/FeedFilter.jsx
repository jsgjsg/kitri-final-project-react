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
      <AiOutlineSearch className="p-2" />
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
