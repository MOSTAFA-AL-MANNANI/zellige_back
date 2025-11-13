import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  };

  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;