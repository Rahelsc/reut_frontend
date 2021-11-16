import { useContext } from "react";
import AdminPanel from "../../components/adminPanel/AdminPanel.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import { AuthContext } from "../../context/AuthContext.js";
import { FeedContextPovider } from "../../feedContext/FeedContext.js";
import "./home.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Topbar />
      {!user.isAdmin && (
        <div className="homeContainer">
          <Leftbar />
          <FeedContextPovider>
            <Feed />
          </FeedContextPovider>
          <Rightbar />
        </div>
      )}
      {user.isAdmin && (
        <AdminPanel/>
      )}
    </>
  );
};

export default Home;
