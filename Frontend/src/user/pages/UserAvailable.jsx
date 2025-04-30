import { Link } from "react-router-dom";
import {  useUserData } from "../context/UserData";       
import { useEffect } from "react";

function UserAvailable() {
  const { toggle, availableUser,userNearMe } = useUserData();
console.log(availableUser);

  useEffect(()=>{
    userNearMe()
  },[])

  return (
    <div>
      <div className="md:w-1/3 my-8 md:mb-0 md:pr-4 flex items-center justify-center gap-8">
        {toggle ? (
          <>
            {availableUser.map((obj) => (
              <div
                key={obj._id}
                className={obj.status==="available"?"bg-green-500 text-white rounded-xl p-6 shadow-lg sticky top-20 w-full max-w-md mx-auto":obj.status==="not_available"?"bg-red-500 text-white rounded-xl p-6 shadow-lg sticky top-20 w-full max-w-md mx-auto":"bg-yellow-500 text-white rounded-xl p-6 shadow-lg sticky top-20 w-full max-w-md mx-auto"}
              >
                <Link to={`/${obj._id}/userProfile`} className="block text-center">
                  <img
                    src={obj.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-2 border-white"
                  />
                  <h2 className="text-lg font-bold mb-2">
                    <strong>Name:</strong> {obj.name}
                  </h2>
                  <p className="text-sm mb-1">
                    <strong>Address:</strong> {obj.address}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>User Available:</strong> {obj.status}
                  </p>
                  <p className="text-sm">
                    <strong>Mode:</strong> {obj.mode}
                  </p>
                </Link>
                <div className="flex justify-center mt-4">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                    Friend Request
                  </button>
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







// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useUserData } from "../context/UserData";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:8080"); // Connect to Socket.io backend

// function UserAvailable() {
//   const { toggle, availableUser, userData } = useUserData();
//   const [sentRequests, setSentRequests] = useState({}); // Track sent requests
//   const [pendingRequests, setPendingRequests] = useState({}); // Track pending requests for the logged-in user

//   // Register user's Socket ID upon component load
//   useEffect(() => {
//     if (userData?._id) {
//       socket.emit("registerUser", userData._id);
//     }
//   }, [userData]);

//   // Listen for incoming friend requests for this user
//   useEffect(() => {
//     socket.on("newRequest", (request) => {
//       alert(`You have a new friend request from ${request.sender}`);
      
//       setPendingRequests((prev) => ({ ...prev, [request.sender]: request._id }));
//     });

//     return () => {
//       socket.off("newRequest"); // Cleanup listener when component unmounts
//     };
//   }, []);

//   // Listen for friend request responses (accept/reject)
//   useEffect(() => {
//     socket.on("requestResponse", ({ requestId, status }) => {
//       alert(`Your friend request was ${status}!`);
      
//       // Remove from pendingRequests if accepted/rejected
//       setPendingRequests((prev) => {
//         const updated = { ...prev };
//         Object.keys(updated).forEach((key) => {
//           if (updated[key] === requestId) {
//             delete updated[key];
//           }
//         });
//         return updated;
//       });
//     });

//     return () => {
//       socket.off("requestResponse"); // Cleanup listener
//     };
//   }, []);

//   // Handle sending a friend request
//   const handleSendRequest = (receiverId) => {
//     if (userData?._id) {
//       socket.emit("sendRequest", {
//         senderId: userData._id,
//         receiverId: receiverId,
//         message: "Hi, I'd like to connect!",
//       });

//       socket.on("requestSent", ({ friendRequest }) => {
//         setSentRequests((prev) => ({ ...prev, [receiverId]: friendRequest._id }));
//       });
//     } else {
//       alert("You must be logged in to send a request!");
//     }
//   };

//   // Handle accepting or rejecting friend requests
//   const handleRespondToRequest = (requestId, status) => {
//     socket.emit("friend_request_respond", { requestId, status });
//   };

//   return (
//     <div>
//       <div className="md:w-1/3 my-8 md:mb-0 md:pr-4 flex items-center justify-center gap-8">
//         {toggle ? (
//           <>
//             {availableUser.map((obj) => (
//               <div key={obj._id} className="bg-green-500 text-white rounded-xl p-6 shadow-lg sticky top-20 w-full max-w-md mx-auto">
//                 <Link to={`/${obj._id}/userProfile`} className="block text-center">
//                   <img src={obj.image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-2 border-white" />
//                   <h2 className="text-lg font-bold mb-2">
//                     <strong>Name:</strong> {obj.name}
//                   </h2>
//                   <p className="text-sm mb-1">
//                     <strong>Address:</strong> {obj.address}
//                   </p>
//                   <p className="text-sm">
//                     <strong>Mode:</strong> {obj.mode}
//                   </p>
//                 </Link>
//                 <div className="flex justify-center mt-4 gap-2">
//                   {/* ✅ Only show "Accept/Reject" buttons if this user received a request */}
//                   {pendingRequests[obj._id] ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
//                         onClick={() => handleRespondToRequest(pendingRequests[obj._id], "accepted")}
//                       >
//                         Accept
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
//                         onClick={() => handleRespondToRequest(pendingRequests[obj._id], "rejected")}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : sentRequests[obj._id] ? (
//                     <span className="text-yellow-500">Request Sent</span> // ✅ Indicate a request has been sent
//                   ) : (
//                     <button
//                       className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition-colors"
//                       onClick={() => handleSendRequest(obj._id)}
//                     >
//                       Friend Request
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </>
//         ) : (
//           <div>
//             <h1>User Not Available...</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserAvailable;