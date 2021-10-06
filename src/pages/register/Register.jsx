import "./register.css";

const Register = () => {
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
          <div className="registerBox">
            <input placeholder="User Name" type="text" className="registerInput" />

            <input placeholder="Email" type="email" className="registerInput" />
            <input
              placeholder="Password"
              type="password"
              className="registerInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              className="registerInput"
            />
            <button className="registerButon" type="submit">
              Sign Up
            </button>

            <button className="registerButon">Login to account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
