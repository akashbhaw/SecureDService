import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { useAuth } from "src/sections/contexts/AuthContext";

export default function PrivateRoute() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Redirect to login page only if the current location is not the login page
  if (!currentUser && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
