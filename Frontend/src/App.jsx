import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./First";
import Home from "./user/pages/Home";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import AdminFirst from "./admin/pages/AdminFirst";
import AdminHome from "./admin/pages/AdminHome";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRegister from "./admin/pages/AdminRegister";
import AdminProtectedRoute from "./admin/pages/AdminProtectedRoute";
import AddHackathonAdmin from "./admin/pages/AddHackathonAdmin";
import AdminAuth from "./admin/context/AdminAuth";
import EditAdminProfile from "./admin/pages/EditAdminProfile";

// import ImageUpload from "./admin/pages/ImageUpload"



const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/userLogin",
        element: <Login />
      },
      {
        path: "/userRegister",
        element: <Register />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminFirst />,
    children: [
      {
        path: "home/:id",
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
        path: "addHackathon/:id",
        element:
          <AdminProtectedRoute>
            <AddHackathonAdmin />
          </AdminProtectedRoute>
      },
      {
        path:":id/editAdminProfile",
        element:
        <AdminProtectedRoute>
          <EditAdminProfile/>
        </AdminProtectedRoute>
      }
    ]
  }
])


function App() {

  return (
    <>
      <AdminAuth>
        <AdminProtectedRoute>
          <RouterProvider router={router} />
        </AdminProtectedRoute>
      </AdminAuth>
    </>
  )
}

export default App
