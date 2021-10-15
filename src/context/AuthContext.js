import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import jwtDecode from "jwt-decode";

let INITIAL_STATE = {
  user: null,
  token: null,
  isFetching: false,
  error: false,
};

// if we are already logged in, we get the user from local storage (no need to keep logging in upon refresh)
if (localStorage.getItem("jwtToken")) {
  // we decode our jwt token
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  // check if the token is valid, .exp gives us time in seconds and we need it in milliseconds to compare .now()
  if (decodedToken.exp * 1000 < Date.now()) {
    // removing from local storage if not valid token
    localStorage.removeItem("jwtToken");
  } else INITIAL_STATE = { ...INITIAL_STATE, user: decodedToken.user };
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
