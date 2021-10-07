import "./profile.css";
import Feed from "../../components/feed/Feed.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

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
