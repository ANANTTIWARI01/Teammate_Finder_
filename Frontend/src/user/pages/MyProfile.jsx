import React from 'react'
import { useUserData } from '../context/UserData'

function MyProfile() {
  const { userData } = useUserData()
  return (
    <>

      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">

        <div className='bg-gray-300 px-4 py-2 my-4 rounded-2xl'>
          <button className='text-white bg-indigo-400 px-8 py-3 my-3 rounded-lg hover:bg-indigo-600 shadow-md transition duration-300 mx-2 text-lg'>Home</button>
          <button className='text-white bg-indigo-600 px-8 py-3 my-3 rounded-lg hover:bg-indigo-400 shadow-md transition duration-300 mx-2 text-lg'>Projects</button>
          <button className='text-white bg-indigo-400 px-8 py-3 my-3 rounded-lg hover:bg-indigo-600 shadow-md transition duration-300 mx-2 text-lg'>About</button>
        </div>


        <div className="bg-white shadow-xl rounded-lg w-full max-w-6xl p-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <img
              src={userData.image}
              alt={userData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            <h1 className="text-3xl font-bold text-gray-900 mt-4">{userData.name}</h1>
            <p className="text-lg text-gray-600">{userData.email}</p>
          </div>

          {/* User Details Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-lg">
            <p><strong>📍 Location:</strong> {userData.address} </p>
            <p><strong>⚡ Mode:</strong> {userData.mode}</p>
            <p><strong>🎉 Joined:</strong> {new Date(userData.createdAt).toDateString()}</p>
            <p><strong>🔓 Logged In:</strong> {userData.isLoggedIn ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>


    </>
  )
}

export default MyProfile