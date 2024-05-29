// axiosInstance.js
import axios from "axios";
import config from "./config";

const BackendURL = config.NODE_ENV === "production" ? config.BackendURL : "http://localhost:5000/api/v1"

const axiosInstance = axios.create({
  baseURL: BackendURL,
})


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('refreshtoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send a request to the token refresh endpoint
        const response = await axiosInstance.post('/refresh/refreshtoken', {
          refreshToken: localStorage.getItem('refreshtoken'),
          accessToken: localStorage.getItem("accesstoken")
        });

        // Update the stored tokens with the new ones
        localStorage.setItem('accesstoken', response.data.accesstoken);
        localStorage.setItem('refreshtoken', response.data.refreshtoken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // Redirect to the login page or perform other necessary actions
        // Handle refresh error appropriately
      }
    }

    return Promise.reject(error);
  }
);


export { axiosInstance };
