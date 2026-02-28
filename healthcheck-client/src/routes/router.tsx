import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/users/UserList";
import Layout from "../pages/components/layouts/Layout";

const isAuthenticated = true; // later from Redux

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <UserList />,
          },
          {
            path: "/users-roles",
            element: <UserList />,
          },
        ],
      },
    ],
  },
]);
