import { Link } from "react-router-dom";
import "./searchResult.css";

const SearchResult = ({ searchResult }) => {
  console.log(searchResult);
  return (
    <Link
      to={`/profile/${searchResult.username}`}
      style={{ textDecoration: "none" }}
    >
      <div className="srContainer">
        <p>{searchResult.username}</p>
        {searchResult?.profilePicture && (
          <img
            className="srImg"
            src={searchResult?.profilePicture}
            alt="user"
          />
        )}
      </div>
    </Link>
  );
};

export default SearchResult;
