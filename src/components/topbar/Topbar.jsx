import { Search } from "@material-ui/icons";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosJWT, logout } from "../../authFunctions";
import SearchResult from "../searchResult/SearchResult";

const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const searchTerm = useRef("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchResults, setSearchResults] = useState();
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosJWT.get(
        `/users/searchTerm/${searchTerm.current.value}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      );
      setSearchResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearAll = () => {
    setSearchResults(undefined);
    setShowSearchBox(false);
    searchTerm.current.value = "";
  };

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Reut</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <form onSubmit={handleSearch}>
              <Search className="searchIcon" fontSize="small" />

              <input
                ref={searchTerm}
                placeholder="Search for a friend"
                className="searchInput"
                onFocus={() => setShowSearchBox(true)}
              />
            </form>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Hompepage</span>
          </div>
          {user ? (
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/no-user-image-icon-3.jpeg"
                }
                alt=""
                className="topbarImg"
              />
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="topbarLink" onClick={() => logout(dispatch)}>
                Logout
              </span>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      {showSearchBox && searchResults && (
        <>
          <div className="searchResults">
            {searchResults.map((sr) => (
              <SearchResult key={sr._id} searchResult={sr} />
            ))}
            <button className="clearButton" onClick={clearAll}>
              Clear
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Topbar;
