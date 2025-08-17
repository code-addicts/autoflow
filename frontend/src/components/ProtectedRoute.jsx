import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, show the page they were trying to access
  return <Outlet />;
}