// src/utils/axiosConfig.js

import axios from "axios";

// Set base URL for Axios
axios.defaults.baseURL = "http://localhost:5000"; // Replace with your API base URL

// Configure Axios to send cookies
axios.defaults.withCredentials = true;

// Axios interceptor for handling token refresh
axios.interceptors.response.use(
  (response) => {
    // Return normal response data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Perform token refresh request
        const response = await axios.post("/api/v1/users/refresh-token");
        const newAccessToken = response.data.accessToken;

        // Update access token in Axios headers
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // Retry original request with new access token
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Handle token refresh failure (e.g., redirect to login)
        throw refreshError;
      }
    }
    // Return error response
    return Promise.reject(error);
  }
);

export default axios;
