import "./profile.css";
import Feed from "../../components/feed/Feed.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Chip } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
import { axiosJWT, logout } from "../../authFunctions";
import { OtherUsersContext } from "../../otherUsersContext/OtherUsersContext";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const { setotherUsers } = useContext(OtherUsersContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosJWT.get(`/users?username=${username}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setUser(res.data);
        setotherUsers(true);
      } catch (error) {
        setotherUsers(false);
      }
    };
    fetchUser();
  }, [username]);

  const handleDelete = async () => {
    try {
      await axiosJWT.delete(`/users/${currentUser._id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      logout(dispatch);
    } catch (error) {
      console.log("handle delete: ", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF + "/person/backBanner.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || PF + "/person/man.png"}
                alt=""
              />
              {currentUser && currentUser._id === user._id ? (
                <Chip
                  label="Delete Profile"
                  className="deleteButton"
                  onDelete={handleDelete}
                />
              ) : (
                ""
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <p className="profileInfoDesc">{user.desc}</p>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
