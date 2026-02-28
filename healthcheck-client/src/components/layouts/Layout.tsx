import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const userRole = "admin" // later from Redux

  return (
    <div className="flex">
      <Sidebar role={userRole} />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Routes render here */}
      </main>
    </div>
  )
}