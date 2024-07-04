import { createContext, useState, useContext, useEffect } from "react";

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

export const useAuth = () => useContext(AuthContext);
