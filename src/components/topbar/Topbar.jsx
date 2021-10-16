import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../authFunctions";

const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Reut</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" fontSize="small" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Hompepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person fontSize="medium" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat fontSize="medium" />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications fontSize="medium" />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        {user ? (
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/man.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        ) : (
          ""
        )}
        {user ? (
          <span className="topbarLink" onClick={() => logout(dispatch)}>
            Logout
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Topbar;
