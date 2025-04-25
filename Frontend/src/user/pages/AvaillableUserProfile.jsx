import React from "react";
import { useParams } from "react-router-dom";
import { useUserData } from "../context/UserData";

function AvaillableUserProfile() {
  const { userId } = useParams();
  const { availableUser } = useUserData();

  if (!availableUser || availableUser.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">Loading user data...</h1>
      </div>
    );
  }

  const user = availableUser.find((eachUser) => userId === eachUser._id);

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-500">User not found!</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-6xl p-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{user.name}</h1>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>

        {/* User Details Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-lg">
          <p><strong>📍 Location:</strong> {user.address} </p>
          <p><strong>⚡ Mode:</strong> {user.mode}</p>
          <p><strong>🎉 Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
          <p><strong>🔓 Logged In:</strong> {user.isLoggedIn ? "Yes" : "No"}</p>
        </div>

        {/* Sections: Hackathons, Projects, Skills */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Past Hackathons */}
          <div className="p-6 bg-gray-200 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900">🚀 Past Hackathons</h3>
            {user.pastAttendedHackathons.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                {user.pastAttendedHackathons.map((hackathon, index) => (
                  <li key={index} className="text-lg">{hackathon}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">No hackathons attended.</p>
            )}
          </div>

          {/* Projects */}
          <div className="p-6 bg-gray-200 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900">💡 Projects</h3>
            {user.projects.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                {user.projects.map((project, index) => (
                  <li key={index} className="text-lg">{project}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">No projects listed.</p>
            )}
          </div>

          {/* Skills */}
          <div className="p-6 bg-gray-200 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900">🎯 Skills</h3>
            {user.skills?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                {user.skills.map((skill, index) => (
                  <li key={index} className="text-lg">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 mt-2">No skills listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvaillableUserProfile;