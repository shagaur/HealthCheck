import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const userRole = "admin" // later from Redux

  return (
    <div className="flex">
      <Sidebar role={userRole} />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}