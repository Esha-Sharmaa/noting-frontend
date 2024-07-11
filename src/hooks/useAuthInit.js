import axios from "../utlis/axiosConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAuthInit = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const initAuth = async () => {
    try {
      const response = await axios.get("/api/v1/users/profile"); // Example route to check authentication status
      const user = response.data.data;

      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error initializing authentication:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return null; // or loading indicator
};

export default useAuthInit;
