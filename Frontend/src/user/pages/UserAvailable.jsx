import React, { useEffect, useState } from 'react'
import instance from '../../../axiosConfig';

function UserAvailable() {
  useEffect(() => {
    userNearMe()
  }, [])
  const [availableUser, setAvailableUser] = useState([])


  async function userNearMe() {
    try {
      const response = await instance.get("/user/nearby-users")
      setAvailableUser(response.data.users)
    } catch (error) {
      console.log(error.message);

    }
  }


  return (
    <>
      <div>
        <div className="md:w-1/3 my-8 md:mb-0 md:pr-4">
          {availableUser.map((obj) => (
            <div className="bg-green-500 text-white rounded-md p-4 shadow-md sticky top-20">
              <img
                src={obj.image}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2>
                <strong>Name:</strong> {obj.name}
              </h2>
              <p>
                <strong>Address:</strong> {obj.address}
              </p>
              <p>
                <strong>Mode:</strong> {obj.mode}
              </p>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserAvailable
