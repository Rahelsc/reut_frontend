import { useEffect, useState } from "react";
import { axiosJWT } from "../../authFunctions";
import "./comment.css";

const Comment = ({ comment }) => {
  const [userComment, setUserComment] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosJWT.get(`/users?userId=${comment.userId}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      setUserComment(res.data);
    };
    fetchUser();
  }, [comment]);

  return (
    <div className="comment commentBottomLeft">
      {userComment && (
        <span className="userNameComment">{userComment.username}: </span>
      )}
      {comment.content}
    </div>
  );
};

export default Comment;
