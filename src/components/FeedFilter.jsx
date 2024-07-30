const FeedFilter = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 p-2 border border-gray-300 rounded-md "
        />
        <select className="flex-1 p-2 border border-gray-300 rounded-md">
          <option value="all">All</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
      </div>
    </div>
  );
};

export default FeedFilter;
