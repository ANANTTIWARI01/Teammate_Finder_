// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import instance from "../../../axiosConfig";
import { Link } from "react-router-dom";
import { useUserData } from "../context/UserData";
import { useEffect, useState } from "react";

function SingleHackathon() {
  const { id } = useParams();
  const { hackathons } = useUserData()
  const [hackathonData, setHackathonData] = useState({})

  useEffect(() => {
    if (hackathons && hackathons.length > 0) {
      setHackathonData(hackathons.find(obj => id === obj._id) || {});
    }
  }, [hackathons, id]);


  return (
    <div className="container mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-12 px-6 rounded-lg shadow-md">
        <h1 className="text-5xl font-bold mb-4">{hackathonData.name || "Hackathon Name"}</h1>
        <p className="text-lg mt-2 mb-4">{hackathonData.description || "Hackathon Description"}</p>
        <a className="mt-6 px-8 py-3 mb-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400" href={hackathonData.hackathonLink}>
          Register Now
        </a>
        <p className="mt-6 text-lg">Event Date: {hackathonData.date?.split("T")[0] || "Date"} | Mode: {hackathonData.mode || "Mode"}</p>
      </div>

      {/* About Section */}
      <div className="py-10 px-6 bg-gray-100 flex flex-col md:flex-row items-center mt-8 rounded-lg shadow-md">
        <img
          src={hackathonData.image || "https://via.placeholder.com/400"}
          alt={hackathonData.name}
          className="h-60 w-80 object-cover rounded-lg shadow-lg mb-6 md:mb-0"
        />
        <div className="md:ml-6">
          <h2 className="text-2xl font-bold text-gray-800">What is {hackathonData.name}?</h2>
          <p className="text-gray-700 mt-2">{hackathonData.description || "Description about the hackathon goes here."}</p>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-800">📅 Schedule</h2>
        <table className="w-full border-collapse bg-gray-200 mt-6 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Event</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">10 AM</td>
              <td className="border px-4 py-2">Opening Ceremony & Keynote</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">12 PM</td>
              <td className="border px-4 py-2">Team Formation & Brainstorming</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3 PM</td>
              <td className="border px-4 py-2">Hackathon Begins</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">9 PM</td>
              <td className="border px-4 py-2">Mid-Hack Check-In</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">8 AM (Next Day)</td>
              <td className="border px-4 py-2">Submissions & Judging</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2 PM (Next Day)</td>
              <td className="border px-4 py-2">Winner Announcements & Closing</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Prizes Section */}
      <div className="py-10 px-6 bg-white mt-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">🎁 Prizes & Recognition</h2>
        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>🥇 1st Place - [$Amount Prize]</li>
          <li>🥈 2nd Place - [$Amount Prize]</li>
          <li>🥉 3rd Place - [$Amount Prize]</li>
          <li>🎖 Special CyberSecurity Innovation Award</li>
        </ul>
      </div>

      {/* Registration Section */}
      <div className="py-10 px-6 bg-yellow-500 text-center mt-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 Ready to Join?</h2>
        <a className="mt-4 px-6 py-2 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-gray-200" href={hackathonData.registrationLink}>
          Register Now
        </a>
      </div>
    </div>
  );
}

export default SingleHackathon;