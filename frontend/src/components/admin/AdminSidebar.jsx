import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

export default function AdminSidebar() {
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
      title: "Members",
      icon: Users,
      path: "/admin/members",
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
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#111827] border-r border-slate-700 flex flex-col">
      {/* Logo */}

      <div className="h-24 flex items-center justify-center border-b border-slate-700">
        <div className="text-center">
          <img
            src={logo}
            alt="BigFree FX"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 py-8">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `mx-4 mb-3 flex items-center gap-4 rounded-xl px-5 py-4 transition
                ${
                  isActive
                    ? "bg-sky-600 text-white"
                    : "text-slate-300 hover:bg-[#1e293b]"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t border-slate-700 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-red-400 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={22} />
          Logout
        </button>
      </div>
    </aside>
  );
}
