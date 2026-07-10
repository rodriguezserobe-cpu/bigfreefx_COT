import { LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-72 min-h-screen">
        {/* Fixed Header */}
        <header className="fixed top-0 left-72 right-0 h-24 border-b border-slate-700 bg-[#171b22] z-40 flex items-center justify-between px-10">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold text-sky-400">
              BIGFREE FX ADMIN
            </h1>

            <p className="text-slate-400 mt-1">
              Manage members and monitor the platform
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="font-semibold">
                {user?.fullName || "Administrator"}
              </p>

              <div className="flex items-center justify-end gap-2 text-green-400 text-sm">
                <ShieldCheck size={16} />
                Administrator
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="pt-32 p-10">{children}</section>
      </main>
    </div>
  );
}
