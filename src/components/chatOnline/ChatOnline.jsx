import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentUserId, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUserId}/${user._id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((of) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(of)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={of?.profilePic || PF + "/person/man.png  "}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{of.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
