import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-[#1b1b1b] border border-slate-700 rounded-xl px-4 py-2 hover:border-sky-500 transition"
      >
        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-bold">
          {user?.fullName?.charAt(0).toUpperCase()}
        </div>

        <div className="text-left hidden xl:block">
          <p className="font-semibold text-white">{user?.fullName}</p>

          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>

        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-[#171b22] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#222831] transition">
            <User size={18} />
            My Profile
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#222831] transition">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#222831] transition">
            <Settings size={18} />
            Settings
          </button>

          <hr className="border-slate-700" />

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
