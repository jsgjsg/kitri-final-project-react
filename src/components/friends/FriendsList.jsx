import FriendsItem from "./FriendsItem";

const FriendsList = ({friends}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">친구 목록</h2>
      <ul className="space-y-4">
        {friends.map((friend) => (
          <FriendsItem key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;