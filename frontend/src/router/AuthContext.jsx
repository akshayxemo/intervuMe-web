// AuthContext.jsx
import { createContext, useState, useContext } from "react";
import jwtDecode from "jwt-decode"; // If you want to check token expiration
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (token, linkTo, role) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    <Navigate to={linkTo} />;
    // navigate("");
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    <Navigate to="/" replace />;
  };

  const isAuthenticated = () => {
    if (!token) {
      // If token is not available, the user is not authenticated
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        return false;
      }

      // Token is valid and not expired
      return true;
    } catch (error) {
      // If there's an error decoding the token, consider the user as not authenticated
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
