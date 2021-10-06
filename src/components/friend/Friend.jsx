import "./friend.css";

const Friend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="leftbarFriend">
        <img src={PF+user.profilePicture} alt="" className="leftbarFriendImg" />
        <span className="leftbarFriendName">{user.username}</span>
      </li>
    </div>
  );
};

export default Friend;
