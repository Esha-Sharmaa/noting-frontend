import axios from "axios";

// Set base URL for Axios
axios.defaults.baseURL = "http://localhost:5000"; // Replace with your API base URL

// Configure Axios to send cookies
axios.defaults.withCredentials = true;

// // Axios interceptor for handling token refresh

// axios.interceptors.response.use(
//   (response) => {
//     // Return normal response data
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 Unauthorized errors
//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         try {
//           // Wait for token refresh and then retry original request
//           const response = await new Promise((resolve, reject) => {
//             failedRequestsQueue.push({ resolve, reject });
//           });
//           originalRequest.headers[
//             "Authorization"
//           ] = `Bearer ${response.data.accessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Perform token refresh request
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           throw new Error("Refresh token not found in localStorage");
//         }

//         const response = await axios.post("/api/v1/users/refresh-token", {
//           refreshToken,
//         });

//         // Update access token in Axios headers
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.accessToken}`;

//         // Update the original request with the new access token
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${response.data.accessToken}`;

//         // Retry original request with new access token
//         const retryResponse = await axios(originalRequest);

//         // Reset _retry flag on successful request
//         originalRequest._retry = false;

//         // Resolve all promises in the queue with the new access token response
//         failedRequestsQueue.forEach((prom) => prom.resolve(retryResponse));
//         failedRequestsQueue = [];

//         return retryResponse;
//       } catch (refreshError) {
//         console.error("Failed to refresh token:", refreshError);

//         // Clear authentication state
//         localStorage.removeItem("isAuthenticated");
//         localStorage.removeItem("user");

//         // Redirect to login
//         window.location.href = "/login";

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     // Return error response
//     return Promise.reject(error);
//   }
// );

export default axios;
