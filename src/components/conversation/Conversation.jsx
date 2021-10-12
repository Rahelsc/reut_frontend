import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

const Conversation = ({ conv, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conv.members.find((mem) => mem !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conv]);

  return (
    <div className="conversation">
      {user && (
        <>
          <img
            src={user?.profilePicture || PF + "/person/man.png"}
            alt=""
            className="conversationImg"
          />
          <span className="conversationName">{user?.username}</span>{" "}
        </>
      )}
    </div>
  );
};

export default Conversation;
