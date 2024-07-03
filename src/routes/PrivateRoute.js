import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const role = localStorage.getItem('role');

  console.log("isAuthenticated from private route", isAuthenticated);

  return isAuthenticated && allowedRoles.includes(role) ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;
