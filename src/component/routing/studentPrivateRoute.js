import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function StudentPrivateRoute({ children }) {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to="/" />;
}
