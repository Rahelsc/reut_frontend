import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Reut</h3>
          <span className="registerDesc">
            Connect With friends and family with Reut
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              required
              ref={username}
              placeholder="User Name"
              type="text"
              className="registerInput"
            />

            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="registerInput"
            />
            <input
              required
              ref={password}
              placeholder="Password"
              type="password"
              className="registerInput"
              minLength="10"
            />
            <input
              minLength="10"
              required
              ref={passwordAgain}
              placeholder="Password Again"
              type="password"
              className="registerInput"
            />
            <button className="registerButon" type="submit">
              Sign Up
            </button>
          </form>
          <Link to="/login">
            <button className="registerButon accountButton">
              Login to account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
