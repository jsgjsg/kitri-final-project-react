const FriendsItem = ({ friend, handleDeleteFriend }) => {
  return (
    <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
          <img
            src={friend.image || "https://via.placeholder.com/150"}
            alt={friend.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-bold">{friend.nickname}</h4>
          <p className="text-gray-500">"{friend.introduce}"</p>
        </div>
      </div>
      {/* 추가적인 작업을 위한 버튼 (예: 친구 삭제) */}
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDeleteFriend(friend.id)}
      >
        삭제
      </button>
    </li>
  );
};

export default FriendsItem;