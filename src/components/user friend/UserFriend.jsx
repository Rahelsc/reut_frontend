import { Link } from "react-router-dom";
import "./UserFriend.css";

const UserFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
        <Link
          className="rightbarFollowing"
          to={"/profile/" + user.username}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/man.png"
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
