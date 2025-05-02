import React, { useState } from "react";
import instance from "../../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/auth/user/register", form, { withCredentials: true });
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">User Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/userLogin"
            className="text-blue-400 hover:underline font-medium"
          >
            Login as User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;