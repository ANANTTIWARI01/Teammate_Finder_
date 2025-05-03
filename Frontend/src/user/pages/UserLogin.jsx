import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../../axiosConfig";
import { useUserAuth } from "../context/UserAuth";

function UserLogin() {
  const { setIsAuthenticated } = useUserAuth();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    try {
      await instance.post("/auth/user/login", form, { withCredentials: true });
      setIsAuthenticated(true);

      navigate(`/`);
    } catch (error) {
      console.log("Login error:", error);
    }
    finally {
      setLoading(false)
    }
  }


  return (<>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">User Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoFocus
            autoComplete="email"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/userRegister"
            className="text-blue-400 hover:underline font-medium"
          >
            Register as User
          </Link>
        </div>
      </div>
    </div>

  </>
  );
}

export default UserLogin;