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
        path:"home",
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
      }
    ]
  }
])


function App() {

  return (
    <>
      <AdminProtectedRoute>
        <RouterProvider router={router} />
      </AdminProtectedRoute>
    </>
  )
}

export default App
