import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectPath = "/signin", children }) => {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace/>;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
