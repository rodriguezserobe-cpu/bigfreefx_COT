import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const JournalNavbar = ({
  collapsed,
  setMobileOpen,
  searchTerm,
  setSearchTerm,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  return (
    <header
      className={`fixed h-29 top-0 right-0 left-0 z-40 bg-[#0d1117]/95 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 ${collapsed ? "lg:left-20" : "lg:left-72"}`}
    >
      <div className="h-20 sm:h-22 lg:h-24 2xl:h-28 flex items-center justify-between gap-3 px-3 sm:px-5 lg:px-8 2xl:px-12">
        {/* Left */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition"
          >
            <FaBars />
          </button>

          <div className="min-w-0">
            <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold text-white truncate">
              Trading Journal Dashboard
            </h1>

            <p className="hidden sm:block text-xs md:text-sm 2xl:text-base text-slate-400 truncate">
              Track every trade. Improve every day.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search */}
          <div className="hidden xl:flex items-center bg-slate-900 border border-slate-700 rounded-xl px-4 h-11 2xl:h-12 w-64 2xl:w-80">
            <FaSearch className="text-slate-500 shrink-0" />

            <input
              type="text"
              placeholder="Search trades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none ml-3 w-full min-w-0 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Notification */}
          <button className="relative w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 transition flex items-center justify-center">
            <FaBell className="text-white text-sm sm:text-base 2xl:text-lg" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 sm:gap-3 rounded-xl border border-slate-700 bg-slate-900 px-2 sm:px-3 py-1.5 sm:py-2 hover:border-sky-500 transition"
            >
              <FaUserCircle className="text-3xl sm:text-4xl 2xl:text-5xl text-sky-400 shrink-0" />

              <div className="hidden md:block text-left min-w-0">
                <p className="text-xs text-slate-400">Welcome Back</p>
                <h3 className="font-semibold text-white truncate max-w-28 lg:max-w-40 2xl:max-w-52">
                  {user?.fullName || "User"}
                </h3>
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-52 sm:w-56 rounded-xl border border-slate-700 bg-[#0d1117] shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-800">
                  <p className="text-white font-semibold truncate">
                    {user?.fullName || "User"}
                  </p>

                  <p className="text-xs text-slate-400 truncate">
                    {user?.email || ""}
                  </p>
                </div>

                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <FaUser />
                  Profile
                </button>

                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <FaCog />
                  Settings
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setProfileOpen(false);
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition border-t border-slate-800"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default JournalNavbar;
