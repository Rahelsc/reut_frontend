import "./login.css";

const Login = () => {
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
          <div className="loginBox">
            <input placeholder="Email" type="email" className="loginInput" />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <button className="loginButon" type="submit">
              Log In
            </button>
          </div>
          <div className="loginNewActions">
            <span className="Forgot">Forgot Password?</span>
            <button className="loginRegisterButon" type="submit">
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
