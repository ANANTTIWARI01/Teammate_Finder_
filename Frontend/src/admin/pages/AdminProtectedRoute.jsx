// import { useEffect, useState } from "react";
// import instance from "../../../axiosConfig";
import { useAdminAuth } from "../context/AdminAuth";
import AdminLogin from "./AdminLogin";

function AdminProtectedRoute({ children }) {

  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) return <div id="loading">LOADING...</div>;


  return isAuthenticated ? children : <AdminLogin/> ;
}

export default AdminProtectedRoute;