import axios from "../utlis/axiosConfig";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axios.post("/api/v1/users/refresh-token");
      console.log("Trying to refresh the token");
      console.log(response?.data);
      return response?.data?.data?.accessToken;
    } catch (error) {
      console.log("Error refreshing token");
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
