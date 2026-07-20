import { LayoutDashboard, BarChart3, Settings, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Open COT Dashboard",
      icon: BarChart3,
      path: "/dashboard",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          h-screen

          w-56

          bg-[#111827]
          border-r
          border-slate-700
          shadow-xl

          flex
          flex-col

          z-50

          transform
          transition-transform
          duration-300

          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-700">
          <img
            src={logo}
            alt="BigFree FX"
            className="w-20 h-20 object-contain"
          />

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white hover:text-sky-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-sky-600 text-white"
                      : "text-slate-300 hover:bg-[#1e293b]"
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white transition"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
