import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosJWT } from "../../authFunctions";
import "./friend.css";

const Friend = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosJWT.get(`/users?userId=${friend}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [friend]);

  return (
    <div>
      {user && (
        <Link
          to={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <li className="leftbarFriend">
            <img
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : PF + "/person/no-user-image-icon-3.jpeg"
              }
              alt=""
              className="leftbarFriendImg"
            />
            <span className="leftbarFriendName">{user.username}</span>
          </li>
        </Link>
      )}
    </div>
  );
};

export default Friend;
