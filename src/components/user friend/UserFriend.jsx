import { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserFriend.css";
import { OtherUsersContext } from "../../otherUsersContext/OtherUsersContext";

const UserFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { setotherUsers } = useContext(OtherUsersContext);

  return (
    <div onClick={() => setotherUsers(true)}>
      <Link
        className="rightbarFollowing"
        to={"/profile/" + user.username}
        style={{ textDecoration: "none" }}
      >
        <img
          src={
            user.profilePicture ? user.profilePicture : PF + "/person/man.png"
          }
          alt=""
          className="rightbarFollowingImg"
        />
        <span className="rightbarFollowingName">{user.username}</span>
      </Link>
    </div>
  );
};

export default UserFriend;
