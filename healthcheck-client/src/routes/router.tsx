import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

import Login from "../auth/Login";
import Layout from "../components/layouts/Layout";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import OrgLayout from "../pages/organization/OrgLayout";
import OrgDashboard from "../features/organization/pages/OrgDashboard";
import UserLayout from "../pages/user/UserLayout";
import OrgListPage from "../features/organization/pages/OrgListPage";

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
            path: "dashboard",
            element: <DashboardLayout />,
          },
          {
            path: "users",
            element: <UserLayout />,
          },
          {
            path: "users-roles",
            element: <UserLayout />,
          },
          {
            path: "org",
            element: <OrgListPage />,
          },
          {
            path: "org/:orgId",
            element: <OrgLayout />,
            children: [
              {
                index: true,
                element: <OrgDashboard />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
