import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./chatOnline.css";

const ChatOnline = ({
  onlineUsers,
  currentUserId,
  setCurrentChat,
  setConversations,
}) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    let takeAction = true;
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
    if (takeAction) {
      getFriends();
    }
    return () => (takeAction = false);
  }, [currentUserId]);

  useEffect(() => {
    console.log("online users: " + onlineUsers);
    console.log("friends: ", friends);
    const userIds = onlineUsers.map((ou) => ou._id);
    setOnlineFriends(friends.filter((f) => userIds.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      let res = await axios.get(
        `/conversations/find/${currentUserId}/${user._id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      console.log("chat online: ", res.data);
      if (res.data == null) {
        try {
          res = await axios.post(
            `/conversations/`,
            { senderId: currentUser._id, recieverId: user._id },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
            }
          );
          try {
            const res = await axios.get("/conversations/" + user._id, {
              headers: {
                authorization: "Bearer " + localStorage.getItem("jwtToken"),
              },
            });
            console.log("get conversations");
            setConversations((prev) => [...prev, res.data]);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
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
              src={of?.profilePic || PF + "/person/no-user-image-icon-3.jpeg  "}
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
