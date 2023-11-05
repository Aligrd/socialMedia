import React from "react";
import AuthContext from "../../Hooks/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return !!localStorage.getItem("accessToken") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
