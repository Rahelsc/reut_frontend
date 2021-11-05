import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { axiosJWT } from "../../authFunctions";
import "./friend.css";
import { OtherUsersContext } from "../../otherUsersContext/OtherUsersContext";


const Friend = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();
  const { setotherUsers } = useContext(OtherUsersContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosJWT.get(`/users?userId=${friend}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setUser(res.data);
        setotherUsers(true)
      } catch (error) {
        setotherUsers(false)
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
                  : PF + "/person/man.png"
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
