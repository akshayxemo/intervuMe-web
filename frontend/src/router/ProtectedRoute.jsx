// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated());
  if (!isAuthenticated()) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
// Add prop validation for restricted prop
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
