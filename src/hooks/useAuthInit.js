import { useNavigate } from "react-router-dom";
import axios from "../utlis/axiosConfig";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAuthInit = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();
  const initAuth = async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const user = localStorage.getItem("user");

    if (isAuthenticated && user) {
      setIsAuthenticated(true);
      setUser(user);
    }
    try {
      await axios.post("/api/v1/users/refresh-token");
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  };

  useEffect(() => {
    initAuth();
  }, []);
};

export default useAuthInit;
