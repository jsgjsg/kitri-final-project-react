import { AiOutlineSearch } from "react-icons/ai";
import { FaPaw } from "react-icons/fa";

const FeedFilter = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md">
          <input type="text" placeholder="검색..." className="p-2" />
          <AiOutlineSearch className="p-2" />
        </div>
        <div className="flex items-center border rounded-md">
          <select className="p-2 border-none rounded-l-md">
            <option value="all">전체</option>
            <option value="cat">고양이</option>
            <option value="dog">강아지</option>
          </select>
          <FaPaw className="p-2" />
        </div>
      </div>
    </div>
  );
};

export default FeedFilter;
