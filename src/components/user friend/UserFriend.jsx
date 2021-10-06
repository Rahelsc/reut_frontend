import "./UserFriend.css";

const UserFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <div className="rightbarFollowing">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="rightbarFollowingImg"
        />
        <span className="rightbarFollowingName">{user.username}</span>
      </div>
    </div>
  );
};

export default UserFriend;
