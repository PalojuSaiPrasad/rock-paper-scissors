// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

function ProtectedRoute({ children }) {
  const token = getToken(); // plain function call, no hooks inside useEffect or outside
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
