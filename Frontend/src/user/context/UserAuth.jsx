/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../../axiosConfig";

export const AuthContext = createContext({});

function UserAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [adminId, setAdminId] = useState("")

  async function checkAuthentication() {
    try {
      setLoading(true);
      await instance.get("/auth/checkUser", { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);
  
  async function UserLogoutHandle() {
    try {
      await instance.post(
        "/auth/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      checkAuthentication();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }


  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, setIsAuthenticated, UserLogoutHandle }}
      >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(AuthContext);
}

export default UserAuth;