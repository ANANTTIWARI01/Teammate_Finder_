
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuth";
import { useUserData } from "../context/UserData";
import { useState } from "react";

function Header() {
  const { isAuthenticated, UserLogoutHandle } = useUserAuth();
  const { userData } = useUserData()
  const [changeHeader,setChangeHeader] = useState(false)
  const navigate = useNavigate();


  function handleLogout() {
    UserLogoutHandle();
    navigate("/userLogin");
  }

  return (
    <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex justify-between items-center">
      {changeHeader ?  <div className="flex justify-between items-center">
        <Link className="text-xl font-bold" to={`/`} onClick={()=>setChangeHeader(false)}> Home</Link>  
      </div>
      :
      <Link className="text-xl font-bold" to={`/`}> User Dashboard</Link>}
      {isAuthenticated ? (<>
        <div className={userData.status === "available" ? "bg-green-500 rounded-full p-2" : userData.status === "soon" ? "bg-yellow-500 rounded-full p-2" : "bg-red-500 rounded-full p-2"}>
          {userData.status}
        </div>
        <Link className="bg-gray-600 text-white px-4 py-3 rounded-3xl" to={`/${userData.name}`} onClick={()=>setChangeHeader(true)}>
          My Profile
        </Link>
        <button
          onClick={() => handleLogout()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>

      </>
      ) : (
        <li className="list-none"></li>
      )}
    </header>
  );
}

export default Header;