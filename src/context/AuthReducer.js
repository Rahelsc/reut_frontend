// console.log("auth: ",localStorage.getItem("currentUser"));
// let user = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser")).user
//   : "";
// let token = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser")).auth_token
//   : "";

// export const initialState = {
//   userDetails: user || "",
//   token: token || "",
//   loading: false,
//   errorMessage: null,
// };

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        // token: action.payload.auth_token,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [
            state.user.followings.filter(
              (following) => following !== action.payload
            ),
          ],
        },
      };
      case "LOGOUT":
        return {
          ...state,
          user: null
        }      
    default:
      return state;
  }
};

export default AuthReducer;
