import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../../axiosConfig";


function Home() {

  const [hackathons, setHackathons] = useState([])
  // const [userData, setUserData] = useState([])

  useEffect(() => {
    showAdminData()
  }, [])

  const showAdminData = async () => {
    try {
      const response = await instance.get(`/user/hackathons`)
      console.log(response.data);

      // setUserData(response.data.adminData);
      setHackathons(response.data.hackathons)
    } catch (error) {
      console.log(error, error.message);
    }
  }



  return (
    <>
      <div className="flex items-stretch min-h-screen w-full bg-gray-100">
        {/* Admin Profile Section */}
        <div className="w-full lg:w-1/3 bg-indigo-50 border-r border-indigo-200 flex flex-col items-center py-8 shadow-lg">
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-6 shadow-md flex items-center justify-center">
            {/* Placeholder for Admin Photo */}
            <img src={null} alt="" className="text-gray-500 font-semibold" />
          </div>
          <Link
            className="text-white bg-indigo-500 px-8 py-3 rounded-lg hover:bg-indigo-600 shadow-md transition duration-300"
            to=""
          >
            Edit Profile
          </Link>
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col bg-white text-center p-6">


          {/* Hackathon List */}
          {hackathons && hackathons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hackathons.map((hackathon, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={hackathon.image}
                    alt={`Hackathon ${hackathon.name}`}
                    className="rounded-t-lg h-40 w-full object-cover mb-4"
                  />
                  <h1 className="text-lg font-bold text-gray-800">
                    {hackathon.name}
                  </h1>
                  <div className="flex items-center justify-around">
                    <h3 className="text-md font-semibold text-gray-800">{hackathon.date.slice(0, 11)}</h3>
                    <h3 className="text-md font-semibold text-gray-800">{hackathon.mode}</h3>
                  </div>
                  <p className="text-gray-600 mt-2">{hackathon.description}</p>

                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg mt-6">
              No hackathons available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;