import axios from "axios";
import jwtDecode from "jwt-decode";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
    localStorage.setItem("jwtToken", res.data.accessToken);
    localStorage.setItem("jwtRefreshToken", res.data.refreshToken);
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const logout = async (dispatch) => {
  try {
    await axios.post(
      "/auth/logout",
      {
        token: localStorage.getItem("jwtRefreshToken"),
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtRefreshToken");
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
  }
};

// an instance to call if we wish to refresh the token
// so that the user won't have to manually do it each time
// only by calling this instance will the refresh occur
export const axiosJWT = axios.create();

// runs before each request from axiosJWT
axiosJWT.interceptors.request.use(
  async (config) => {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
      await refreshToken();
      // update my authorization header
      config.headers["authorization"] =
        "Bearer " + localStorage.getItem("jwtToken");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const refreshToken = async () => {
  try {
    const res = await axios.post("/auth/refresh", {
      token: localStorage.getItem("jwtRefreshToken"),
    });
    localStorage.setItem("jwtToken", res.data.accessToken);
    localStorage.setItem("jwtRefreshToken", res.data.refreshToken);
  } catch (error) {
    console.log(error);
  }
};
