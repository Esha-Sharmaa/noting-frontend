import axios from "axios";
const BASE_URL = "https://noting-backend-lev7.onrender.com";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
