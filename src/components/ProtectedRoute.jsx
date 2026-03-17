import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  // If not authenticated, redirect to the login page
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;