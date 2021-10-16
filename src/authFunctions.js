import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
    localStorage.setItem("jwtToken", res.data.accessToken);
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("jwtToken");
};

export const refreshToken = async ()=>{
  try {
    // "/auth/refresh"
  } catch (error) {
    console.log(error);
  }
}
