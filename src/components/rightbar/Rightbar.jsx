import "./rightbar.css";
import UserFriend from "../user friend/UserFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { SocketContext } from "../../socketContext/SocketContext";
import ChatOnline from "../chatOnline/ChatOnline";
import { useRef } from "react";
import { io } from "socket.io-client";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState();
  const { currentlyOnlineFriends, setCurrentlyOnlineFriends } =
    useContext(SocketContext);
  const socket = useRef();

  useEffect(() => (socket.current = io("ws://localhost:8900")), []);

  // followed is being updated based on the user you're currently viewing
  useEffect(() => {
    console.log("user: ", user);
    setFollowed(currentUser?.followings.includes(user?._id));
    console.log("user?._id: ", user?._id, ": ", currentUser?.followings);
    console.log(
      "currentUser.followings.includes(user?._id): ",
      currentUser?.followings.includes(user?._id)
    );
  }, [user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "/users/friends/" + currentUser?._id
        );
        setFriends(friendList?.data);
      } catch (error) {
        console.log(error);
      }
    };
    // only if there is a user logged in, get friends
    currentUser && getFriends();
  }, [currentUser, user]);

  const handleClickFriend = async () => {
    console.log("followed: ", followed);
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser?._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed((prev) => !prev);
  };

  // send to server user .emit, to get from server .on
  useEffect(() => {
    // send current user details to socket server
    socket.current.emit("addUser", currentUser?._id);
    // get user from server
    socket.current.on("getUsers", (users) => {
      setCurrentlyOnlineFriends(
        currentUser?.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [setCurrentlyOnlineFriends, currentUser]);

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Shira Gabay</b> and <b>3 other friends</b> are celebrating their
            birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          <ChatOnline
            onlineUsers={currentlyOnlineFriends}
            currentUserId={currentUser?._id}
          />
        </ul>
      </>
    );
  };

  const relationshipStatus = {
    1: "Single",
    2: "Married",
    3: "In a relationship",
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClickFriend}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {relationshipStatus[user.relationship]}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {currentUser?._id !== user._id && user?.followings
            ? user.followings.map((friend) => (
                <UserFriend key={friend._id} user={friend} />
              ))
            : currentUser
            ? friends.map((friend) => (
                <UserFriend key={friend._id} user={friend} />
              ))
            : ""}
        </div>
      </>
    );
  };
  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;
