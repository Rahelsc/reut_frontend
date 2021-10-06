import "./friend.css";

const Friend = ({ user }) => {
  return (
    <div>
      <li className="leftbarFriend">
        <img src={user.profilePicture} alt="" className="leftbarFriendImg" />
        <span className="leftbarFriendName">{user.username}</span>
      </li>
    </div>
  );
};

export default Friend;
