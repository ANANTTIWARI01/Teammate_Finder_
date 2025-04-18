// import { useEffect, useState } from "react";
// import instance from "../../../axiosConfig";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuth";
import Login from "../../user/pages/Login";

function AdminProtectedRoute({ children }) {

  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) return <div id="loading">LOADING...</div>;


  return isAuthenticated ? children : <Login/> ;
}

export default AdminProtectedRoute;