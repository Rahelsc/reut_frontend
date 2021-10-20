import axios from "axios";
import { useEffect, useState } from "react";
import "./comment.css"

const Comment = ({ comment }) => {
    const [userComment, setUserComment] = useState({})
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${comment.userId}`);
        setUserComment(res.data);
      };
      fetchUser();
    }, [comment]);

  return (
    <div className="comment commentBottomLeft">
      {userComment && <span className="userNameComment">{userComment.username}: </span>}
      {comment.content}
    </div>
  );
};

export default Comment;
