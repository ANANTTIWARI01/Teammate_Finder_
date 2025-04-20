import React from "react";
import { Link, useParams } from "react-router-dom";

function AdminHome() {
  const {id} =useParams()
  return (
    <>
      <div className="flex items-stretch h-screen w-full">
        {/* Admin Profile Section */}
        <div className="w-[30%] bg-indigo-100 border-r-4 border-indigo-500 flex flex-col items-center py-8">
          <div className="w-[60%] h-[40%] bg-gray-300 rounded-full mb-6 shadow-lg">
            {/* Placeholder for Admin Photo */}
          </div>
          <button
            className="text-white bg-indigo-500 px-6 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
          >
            Edit Profile
          </button>
        </div>

        {/* Main Content Section */}
        <div className="w-[70%] flex flex-col justify-center items-center bg-gray-600 text-center">
          <Link
            to={`/admin/addHackathon/${id}`} // Relative path for the nested route in your /admin layout
            className="text-white bg-blue-500 px-8 py-4 rounded-3xl shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Add Hackathon
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminHome;