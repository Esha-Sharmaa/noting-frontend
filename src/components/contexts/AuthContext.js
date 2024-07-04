import { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const login = ({ email, password }) => {
    // make a post request to "http://localhost:5000/api/v1/users/login"
    // if login is successfull set isAuthenticated and user state
    // else show error
  };
  const logout = () => {
    // make post request to "http://localhost:5000/api/v1/users/logout"
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
