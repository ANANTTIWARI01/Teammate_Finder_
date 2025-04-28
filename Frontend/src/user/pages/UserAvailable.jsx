import { Link } from "react-router-dom";
import { useUserData } from "../context/UserData";
// import { useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:8080"); 

function UserAvailable() {
  const { toggle, availableUser } = useUserData();


  return (
    <div>
      <div className="md:w-1/3 my-8 md:mb-0 md:pr-4">
        {toggle ? (
          <>
            {availableUser.map((obj) => (
              <div
                key={obj._id}
                className="bg-green-500 text-white rounded-md p-4 shadow-md sticky top-20"
              >
                <Link to={`/${obj._id}`}>
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
                </Link>
                <div className="text-center bg-red-500 p-2 rounded-2xl w-1/3 flex items-center justify-center">
                  {/* <button onClick={() => sendFriendRequest(obj._id)}>Send Friend Request</button> */}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <h1>User Not Available...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAvailable;