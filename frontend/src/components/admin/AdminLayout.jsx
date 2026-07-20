import { LogOut, ShieldCheck, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 lg:ml-56">
        <header className="fixed top-0 left-0 lg:left-56 right-0 h-20 bg-[#171b22] border-b border-slate-700 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
            >
              <Menu size={26} />
            </button>

            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-sky-400">
                BIGFREE FX ADMIN
              </h1>

              <p className="hidden sm:block text-sm text-slate-400">
                Manage members and monitor the platform
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
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
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <section className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
          {children}
        </section>
      </main>
    </div>
  );
}
