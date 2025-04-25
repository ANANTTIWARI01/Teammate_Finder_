import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./First";
import Home from "./user/pages/Home";
import Login from "./user/pages/UserLogin";
import Register from "./user/pages/Register";
import AdminFirst from "./admin/pages/AdminFirst";
import AdminHome from "./admin/pages/AdminHome";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRegister from "./admin/pages/AdminRegister";
import AdminProtectedRoute from "./admin/pages/AdminProtectedRoute";
import AddHackathonAdmin from "./admin/pages/AddHackathonAdmin";
import AdminAuth from "./admin/context/AdminAuth";
import EditAdminProfile from "./admin/pages/EditAdminProfile";
import EditHackathon from "./admin/pages/EditHackathon";
import UserProtectedRoute from "./user/pages/UserProtectedRoute";
import UserAuth from "./user/context/UserAuth";
import EditUser from "./user/pages/EditUser";
import UserAvailable from "./user/pages/UserAvailable";
import SingleHackathon from "./user/pages/SingleHackathon";
import UserProfile from "./user/pages/AvaillableUserProfile";
import UserData from "./user/context/UserData";
import AvaillableUserProfile from "./user/pages/AvaillableUserProfile";

// import ImageUpload from "./admin/pages/ImageUpload"



const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element:
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
      },
      {
        path: "editUser",
        element:
          <UserProtectedRoute>
            <EditUser />
          </UserProtectedRoute>
      },
      {
        path: "userAvailable",
        element:
          <UserProtectedRoute>
            <UserAvailable />
          </UserProtectedRoute>
      },
      {
        path: ":hackathonName/:id",
        element:
          <UserProtectedRoute>
            <SingleHackathon />
          </UserProtectedRoute>
      },
      {
        path: ":userId",
        element:
          <UserProtectedRoute>
            <AvaillableUserProfile />
          </UserProtectedRoute>
      },
      {
        path: "userLogin",
        element: <Login />
      },
      {
        path: "userRegister",
        element: <Register />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminFirst />,
    children: [
      {
        path: "home",
        element:
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
      },
      {
        path: "login",
        element: <AdminLogin />
      },
      {
        path: "register",
        element: <AdminRegister />
      },
      {
        path: "addHackathon",
        element:
          <AdminProtectedRoute>
            <AddHackathonAdmin />
          </AdminProtectedRoute>
      },
      {
        path: ":id/editAdminProfile",
        element:
          <AdminProtectedRoute>
            <EditAdminProfile />
          </AdminProtectedRoute>
      },
      {
        path: ":id/editHackathon",
        element: <AdminProtectedRoute>
          <EditHackathon />
        </AdminProtectedRoute>
      }
    ]
  }
])


function App() {

  return (
    <>
      <AdminAuth>

        <UserAuth>
          <UserData>
          <RouterProvider router={router} />
          </UserData>
        </UserAuth>
      </AdminAuth>
    </>
  )
}

export default App
