import { createContext, useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const login = async ({ email, password }) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      { email, password }
    );
    return response.data;
  };
  const logout = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/logout"
    );
    return response.data;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
