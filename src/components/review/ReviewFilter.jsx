import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPaw, FaBone, FaCandyCane, FaFutbol, FaPills } from "react-icons/fa";

const ReviewFilter = ({ setKeyword, setAnimalFilter, setCategoryFilter }) => {
  const [animalFilter, setAnimal] = useState("all");
  const [categoryFilter, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAnimalFilterChange = (e) => {
    setAnimal(e.target.value);
    setAnimalFilter(e.target.value);
    console.log("setAnimal");
  };

  const handleCategoryFilterChange = (e) => {
    setCategory(e.target.value);
    setCategoryFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [animalFilter, categoryFilter]);

  const getCategoryIcon = () => {
    switch (categoryFilter) {
      case "food":
        return <FaBone className="ml-2" />;
      case "snack":
        return <FaCandyCane className="ml-2" />;
      case "toy":
        return <FaFutbol className="ml-2" />;
      case "supplement":
        return <FaPills className="ml-2" />;
      default:
        return <FaPaw className="ml-2" />;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded"
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="flex items-center space-x-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
      >
        <AiOutlineSearch />
      </button>
      <select
        value={animalFilter}
        onChange={handleAnimalFilterChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="all">전체</option>
        <option value="cat">고양이</option>
        <option value="dog">강아지</option>
      </select>
      <select
        value={categoryFilter}
        onChange={handleCategoryFilterChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="all">전체</option>
        <option value="food">사료</option>
        <option value="snack">간식</option>
        <option value="toy">장난감</option>
        <option value="supplement">영양제</option>
      </select>
      {getCategoryIcon()}
    </div>
  );
};

export default ReviewFilter;
