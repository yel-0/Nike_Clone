import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const tokenData = JSON.parse(localStorage.getItem("token"));
    if (tokenData && tokenData.expiresAt > new Date().getTime()) {
      // If token is available and valid, set the Authorization header
      config.headers["Authorization"] = `Bearer ${tokenData.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
