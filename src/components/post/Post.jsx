import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosJWT } from "../../authFunctions";
import { FeedContext } from "../../feedContext/FeedContext";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsliked] = useState(false);
  const [user, setUser] = useState({});
  const { setPostBeforeRefresh } = useContext(FeedContext);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsliked(post.likes.includes(currentUser?._id));
  }, [post.likes, currentUser?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${post._id}`);
      setComments(res.data);
    };
    fetchComments();
  }, [post]);

  // post comment
  const content = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let newComment = {
      userId: user._id,
      postId: post._id,
      content: content.current.value,
    };
    setComments((prev) => [...prev, newComment]);
    try {
      await axios.post("/comments", newComment);
      content.current.value = "";
    } catch (error) {}
  };

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
      setLike(isliked ? like - 1 : like + 1);
      setIsliked(!isliked);
    } catch (error) {}
  };

  const deletePost = async (postId) => {
    try {
      await axiosJWT.delete(`/posts?postId=${postId}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      setPostBeforeRefresh("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="postContainer">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : PF + "person/man.png"
                  }
                  alt=""
                />
              </Link>

              <span className="postUserName">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img
              className="postImg"
              // local folder for testing, to render pics from public folder and not have a broken link
              src={
                post?.img
                  ? post.img.startsWith("post")
                    ? PF + post.img
                    : post.img
                  : ""
              }
              alt=""
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                onClick={likeHandler}
                className="likeIcon"
                src={`${PF}like.png`}
                alt=""
              />
              <img
                onClick={likeHandler}
                className="likeIcon"
                src={isliked ? `${PF}heart.png` : `${PF}not_liked.png`}
                alt=""
              />
              <span className="postLikeCounter">{like} people like it</span>
            </div>

            <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={() => setShowComments((prev) => !prev)}
              >
                {post.comment} comments
              </span>
              {currentUser && currentUser._id === post.userId ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => deletePost(post._id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="postComment">
          <form className="shareBottom" onSubmit={submitHandler}>
            <input
              placeholder={`${currentUser.username} your thoughts on this post?`}
              className="commentInput"
              type="text"
              ref={content}
            />
            <button type="submit" className="commentButton">
              Comment
            </button>
          </form>
        </div>
      </div>
      {showComments &&
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </>
  );
};

export default Post;
