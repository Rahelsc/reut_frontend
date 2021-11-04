import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { axiosJWT } from "../../authFunctions";

const Message = ({ own, message }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosJWT.get("/users?userId=" + message.sender, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user?.profilePicture ? user.profilePicture : PF + "/person/man.png"
          }
          alt=""
        />
        <p className={own ? "messageText own" : "messageText"}>
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
