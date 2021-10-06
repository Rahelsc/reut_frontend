import "./register.css";

const Register = () => {
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
            <input placeholder="User Name" type="text" className="loginInput" />

            <input placeholder="Email" type="email" className="loginInput" />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              className="loginInput"
            />
            <button className="loginButon" type="submit">
              Sign Up
            </button>

            <button className="loginButon">Login to account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
