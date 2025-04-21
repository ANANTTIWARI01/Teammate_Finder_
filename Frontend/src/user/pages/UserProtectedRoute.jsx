 
import { useUserAuth } from "../context/UserAuth";
import UserLogin from "./UserLogin";

function UserProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useUserAuth();

  if (loading) {
    return <div id="loading">LOADING...</div>;
  }

  return isAuthenticated ? children : <UserLogin />;
}

export default UserProtectedRoute;