import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAuthInit = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const initAuth = async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (isAuthenticated && user) {
      setIsAuthenticated(true);
      setUser(user);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    initAuth();
  }, []); // Run once on component mount

  return null; // or loading indicator
};

export default useAuthInit;
