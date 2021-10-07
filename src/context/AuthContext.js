import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "615effd4bf3ff43dacd4f8a8",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
    username: "rahel",
    email: "rahelsc@gmail.com",
    password: "$2b$10$j8kOFRbwBG2THlln9ZPx5OUuY3wiCUcgEmoZGRC8xnZ8uW1HCSSTG",

    city: "Qiryat Gat",
    desc: "awesome sauce",
    from: "Israel",
    relationship: "2",
  },
  isFetching: false,
  error: false,
};

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
