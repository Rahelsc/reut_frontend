import Feed from "../../components/feed/Feed.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import { FeedContextPovider } from "../../feedContext/FeedContext.js";
import "./home.css";

const Home = () => {
  console.log("from home");
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Leftbar />
        <FeedContextPovider>
          <Feed />
        </FeedContextPovider>
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
