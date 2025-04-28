import { Link } from "react-router-dom";
import { useUserData } from "../context/UserData";

function UserAvailable() {
  const { toggle, availableUser } = useUserData();

  // console.log(availableUser);

  return (
    <div>
      <div className="md:w-1/3 my-8 md:mb-0 md:pr-4 flex items-center justify-center gap-8">
        {toggle ? (
          <>
            {availableUser.map((obj) => (
              <div
                key={obj._id}
                className="bg-green-500 text-white rounded-xl p-6 shadow-lg sticky top-20 w-full max-w-md mx-auto"
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
                  <p className="text-sm">
                    <strong>Mode:</strong> {obj.mode}
                  </p>
                </Link>
                <div className="flex justify-center mt-4">
                  <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition-colors">
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