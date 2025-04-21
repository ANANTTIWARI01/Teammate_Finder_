import { Navigate } from "react-router-dom"; 
import { useAdminAuth } from "../context/AdminAuth";
import AdminLogin from "./AdminLogin";

function AdminProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <div id="loading">LOADING...</div>;
  }

  return isAuthenticated ? children : <AdminLogin />;
}

export default AdminProtectedRoute;