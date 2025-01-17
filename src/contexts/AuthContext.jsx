import { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const axios = useAxios();

  const login = async ({ email, password }) => {
    const response = await axios.post("/api/v1/users/login", {
      email,
      password,
    });
    return response.data;
  };
  const googleLogin = async (accessToken) => {
    const response = await axios.post("/api/v1/users/login", {
      googleAccessToken: accessToken,
    });
    return response.data;
  };
  const logout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout");
      return response.data;
    } catch (error) {
      console.log("Error logging out");
      throw error;
    }
  };
  const registerUser = async ({ fullName, email, password }) => {
    const response = await axios.post("/api/v1/users/register", {
      fullName,
      email,
      password,
    });
    return response.data;
  };

  const changeAvatar = async (formData) => {
    try {
      const response = await axios.put("/api/v1/users/changeAvatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser((prevUser) => ({
        ...prevUser,
        avatar: response.data.data.avatar,
      }));
      return response.data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  };
  const deleteAvatar = async () => {
    try {
      const response = await axios.put("/api/v1/users/deleteAvatar");
      setUser((prevUser) => ({
        ...prevUser,
        avatar: null,
      }));
      return response.data;
    } catch (error) {
      console.error("Error deleting avatar:", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        setIsAuthenticated,
        setUser,
        changeAvatar,
        deleteAvatar,
        registerUser,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
