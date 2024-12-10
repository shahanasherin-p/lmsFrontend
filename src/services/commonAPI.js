import axios from "axios";
import SERVER_URL from "./serverUrl";

const axiosInstance = axios.create({
  baseURL: SERVER_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";
  
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
  
      return config;
    },
    (err) => Promise.reject(err)
  );

export default axiosInstance
