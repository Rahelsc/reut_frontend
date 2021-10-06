import { Button } from "@material-ui/core";
import {
  Bookmark,
  Chat,
  Event,
  ExpandMore,
  Group,
  Help,
  PlayCircleFilled,
  RssFeed,
  School,
  Work,
} from "@material-ui/icons";
import Friend from "../friend/Friend";
import "./leftbar.css";
import { Users } from "../../dummyData";


const Leftbar = () => {
  return (
    <div className="leftbarContainer">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarListItem">
            <Chat className="sidebarIcon" />
            <span className="leftbarListItemText">Chat</span>
          </li>
          <li className="leftbarListItem">
            <Help className="sidebarIcon" />
            <span className="leftbarListItemText">Help</span>
          </li>
          <li className="leftbarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="leftbarListItemText">Bookmark</span>
          </li>
          <li className="leftbarListItem">
            <Group className="sidebarIcon" />
            <span className="leftbarListItemText">Groups</span>
          </li>
          <li className="leftbarListItem">
            <PlayCircleFilled className="sidebarIcon" />
            <span className="leftbarListItemText">Videos</span>
          </li>
          <li className="leftbarListItem">
            <Work className="sidebarIcon" />
            <span className="leftbarListItemText">Jobs</span>
          </li>
          <li className="leftbarListItem">
            <Event className="sidebarIcon" />
            <span className="leftbarListItemText">Events</span>
          </li>
          <li className="leftbarListItem">
            <School className="sidebarIcon" />
            <span className="leftbarListItemText">Courses</span>
          </li>
        </ul>
        <Button
          variant="contained"
          className="leftbarButton"
          size="small"
          endIcon={<ExpandMore />}
        >
          Show More
        </Button>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {Users.map((user) => (
            <Friend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
