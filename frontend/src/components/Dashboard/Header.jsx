import logo from "../../assets/logo.png";
import { markets } from "../../data/markets";
import ProfileMenu from "./ProfileMenu";
import { Menu } from "lucide-react";

const Header = ({
  search,
  setSearch,
  setMarket,
  user,
  latestDate,
  toggleSidebar,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl">
      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto h-20 lg:h-24 2xl:h-28 px-4 sm:px-6 lg:px-8 2xl:px-12 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white mr-2 p-1 rounded-md hover:bg-sky-500/20 hover:text-sky-400 transition"
          >
            {<Menu size={26} />}
          </button>

          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 object-contain"
          />

          <div className="leading-tight">
            <h1 className="font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
              BIGFREE FX
            </h1>

            <p className="uppercase tracking-[2px] md:tracking-[4px] lg:tracking-[5px] text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] 2xl:text-xs text-sky-400">
              Commitment of Traders
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative hidden md:block w-60 lg:w-[320px] 2xl:w-[420px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Market..."
            className="w-full bg-[#1b1b1b] border border-slate-700 rounded-xl py-2.5 lg:py-3 2xl:py-4 pl-10 pr-4 text-white text-sm 2xl:text-lg focus:outline-none focus:border-sky-500"
          />

          <span className="absolute left-3 top-3 lg:top-3.5">🔍</span>

          {search && (
            <div className="absolute top-14 w-full bg-[#1b1b1b] rounded-xl border border-slate-700 overflow-hidden max-h-72 overflow-y-auto">
              {markets
                .filter(
                  (item) =>
                    item.code.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item) => (
                  <div
                    key={item.code}
                    onClick={() => {
                      setMarket(item.code);
                      setSearch("");
                    }}
                    className="px-4 py-3 hover:bg-sky-600 cursor-pointer transition"
                  >
                    <strong>{item.code}</strong> — {item.name}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden sm:block text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>

              <span className="text-green-400 font-semibold text-xs lg:text-base 2xl:text-lg">
                LIVE
              </span>
            </div>

            <p className="text-[10px] lg:text-xs 2xl:text-sm text-slate-400">
              Updated{" "}
              {latestDate
                ? new Date(latestDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Loading..."}
            </p>
          </div>

          <ProfileMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
