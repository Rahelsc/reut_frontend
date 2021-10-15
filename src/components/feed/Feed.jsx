import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FeedContext } from "../../feedContext/FeedContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  // dependency of fetch post, so each time the user posts a new post the fetch will occur
  const { postBeforeRefresh } = useContext(FeedContext);

  // take the id from the user before the useEffect and so we can use it in the useEffect
  // otherwise at starting point the value is undefined and the get requests return with error
  const id = user._id;

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("in fetch", postBeforeRefresh);

      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + id);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [username, id, postBeforeRefresh]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
