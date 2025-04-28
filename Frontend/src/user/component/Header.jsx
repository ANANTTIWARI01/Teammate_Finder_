
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuth";

function Header() {
  const { isAuthenticated, UserLogoutHandle } = useUserAuth();
  const navigate = useNavigate();

  function handleLogout() {
    UserLogoutHandle();
    navigate("/userLogin");
  }

  return (
    <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold"> User Dashboard</h1>
      {isAuthenticated ? (
        <button
          onClick={() => handleLogout()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      ) : (
        <li className="list-none"></li>
      )}
    </header>
  );
}

export default Header;