import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";

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
        className="flex items-center gap-2 bg-[#1b1b1b] border border-slate-700 rounded-xl px-2 py-2 lg:px-3 hover:border-sky-500 transition"
      >
        <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center font-bold">
          {user?.fullName?.charAt(0).toUpperCase()}
        </div>

        <div className="hidden 2xl:block text-left">
          <p className="font-semibold text-white text-sm">{user?.fullName}</p>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-[#171b22] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
