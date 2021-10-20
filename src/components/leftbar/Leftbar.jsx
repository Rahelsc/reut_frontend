import { Chat, Help, RssFeed } from "@material-ui/icons";
import Friend from "../friend/Friend";
import "./leftbar.css";
import { Users } from "../../dummyData";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Leftbar = () => {

  const {user} = useContext(AuthContext)
  return (
    <div className="leftbarContainer">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarListItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Chat className="sidebarIcon" />
              <span className="leftbarListItemText">Chat</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <Help className="sidebarIcon" />
            <span className="leftbarListItemText">Help</span>
          </li>
        </ul>

        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {user.followings.map((friend) => (
            <Friend key={friend._id} friend={friend} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
