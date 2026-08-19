import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Get logged-in user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Get user's name
  const userName = user?.fullName || user?.name || user?.username || "Trader";

  // Get first letter for profile circle
  const userInitial = userName.charAt(0).toUpperCase();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    navigate("/");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* ================= LOGO ================= */}
          <Link to="/bigfreefxhub" className="flex items-center gap-3">
            <img
              src={logo}
              alt="BigFree FX"
              className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
            />

            <div className="translate-y-1 md:translate-y-3">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wide">
                BIGFREE FX
              </h1>

              <p className="text-[10px] md:text-sm text-sky-400 uppercase tracking-[2px] md:tracking-[4px]">
                Trading
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center gap-8 text-white font-medium">
            <Link to="/bigfreefxhub" className="hover:text-sky-400 transition">
              Hub
            </Link>

            <Link to="/dashboard" className="hover:text-sky-400 transition">
              COT Dashboard
            </Link>

            <Link to="/journal" className="hover:text-sky-400 transition">
              Trading Journal
            </Link>

            <span className="text-gray-500">More Coming Soon</span>
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div ref={profileRef} className="hidden md:block relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-sky-500/20 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 transition"
              >
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-bold text-white">
                  {userInitial}
                </div>

                <div className="text-left">
                  <p className="text-xs text-gray-400">Welcome</p>

                  <p className="text-sm font-semibold text-white">{userName}</p>
                </div>

                <span
                  className={`text-slate-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-700 bg-[#0d1117] shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-xs text-slate-500">Signed in as</p>

                    <p className="text-sm text-white font-semibold truncate">
                      {userName}
                    </p>

                    <p className="text-xs text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white text-2xl p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>
      {/* ================= SMALL BANNER ================= */}
      <div className="fixed top-[96px] md:top-[120px] left-0 w-full z-40 bg-[#0d1117]/70 backdrop-blur border-b border-sky-500/10">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="overflow-hidden">
            <p className="text-sky-400 text-base md:text-lg font-extrabold tracking-wide whitespace-nowrap animate-marquee">
              Select a dashboard to continue your trading journey.
            </p>
          </div>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 w-72 h-full bg-[#0d1117] z-50 shadow-2xl border-l border-sky-500/20 lg:hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">BIGFREE FX</h2>

                <p className="text-xs text-sky-400">Trading</p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex flex-col gap-6 p-6">
              <Link
                to="/bigfreefxhub"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-sky-400"
              >
                🏠 Hub
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-sky-400"
              >
                📈 COT Dashboard
              </Link>

              <Link
                to="/journal"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-sky-400"
              >
                📖 Trading Journal
              </Link>

              <span className="text-gray-500">🎓 Education (Coming Soon)</span>

              <span className="text-gray-500">
                📰 Market News (Coming Soon)
              </span>

              <span className="text-gray-500">
                📅 Economic Calendar (Coming Soon)
              </span>

              <hr className="border-slate-700" />

              {/* Mobile User */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-bold text-white">
                  {userInitial}
                </div>

                <div>
                  <p className="text-xs text-gray-400">Welcome</p>

                  <p className="text-white font-semibold">{userName}</p>
                </div>
              </div>

              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="mt-6 bg-sky-500 hover:bg-sky-600 py-3 rounded-lg text-white font-semibold transition"
              >
                Logout
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
