import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(username);
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/611eb1f101d1f859e89823b7");
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
