const FeedFilter = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <input type="text" placeholder="Search..." />
      <select>
        <option value="all">All</option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </select>
    </div>
  );
}

export default FeedFilter;