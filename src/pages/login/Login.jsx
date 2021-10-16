import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../authFunctions";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Reut</h3>
          <span className="loginDesc">
            Connect With friends and family with Reut
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              required
              minLength="10"
              ref={password}
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <button className="loginButon" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="loginNewActions">
            <span className="Forgot">Forgot Password?</span>
            <Link to="/">
              <button className="loginRegisterButon" type="submit">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create an account"
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
