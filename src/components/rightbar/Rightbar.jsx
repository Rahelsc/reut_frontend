import "./rightbar.css";
import UserFriend from "../user friend/UserFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { SocketContext } from "../../socketContext/SocketContext";
import ChatOnline from "../chatOnline/ChatOnline";
import { axiosJWT } from "../../authFunctions";

const Rightbar = ({ user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const HomeRightBar = () => {
    const { currentlyOnlineFriends } = useContext(SocketContext);

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
        {/* <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {currentlyOnlineFriends && (
            <ChatOnline
              onlineUsers={currentlyOnlineFriends}
              currentUserId={currentUser?._id}
            />
          )}
        </ul> */}
      </>
    );
  };

  const relationshipStatus = {
    1: "Single",
    2: "Married",
    3: "In a relationship",
  };

  const ProfileRightBar = () => {
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState();

    useEffect(() => {
      const getFriendsNow = async () => {
        let friends;
        if (currentUser) {
          friends = await axiosJWT.get(`/users/friends/${currentUser?._id}`, {
            headers: {
              authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          });
          setFollowed(
            friends.data.filter((friend) => friend._id === user._id).length > 0
          );
        }
        console.log("user & currentUser: " + user);
        if (user && currentUser && currentUser?._id !== user?._id) {
          friends = await axiosJWT.get(`/users/friends/${user?._id}`, {
            headers: {
              authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          });
        }
        setFriends(friends.data);
        // checks whether current user whose profile we're viewing is contained in the friends array of current user
      };
      getFriendsNow();
    }, [followed, user]);

    const handleClickFriend = async () => {
      console.log("followed: ", followed);
      try {
        if (followed) {
          await axios.put(
            "/users/" + user._id + "/unfollow",
            {
              userId: currentUser?._id,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
            }
          );
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(
            "/users/" + user._id + "/follow",
            {
              userId: currentUser?._id,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
            }
          );
          dispatch({ type: "FOLLOW", payload: user._id });
        }
      } catch (error) {
        console.log(error);
      }

      setFollowed((prev) => !prev);
    };
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
          {friends.map((friend) => (
            <UserFriend key={friend._id} user={friend} />
          ))}
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
