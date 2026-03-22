import React from 'react';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  // Check if the user is already logged in
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  // If logged in, redirect to home. If not, show the login page (children).
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;