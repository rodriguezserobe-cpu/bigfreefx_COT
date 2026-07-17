import logo from "../../assets/logo.png";
import { markets } from "../../data/markets";
import ProfileMenu from "./ProfileMenu";

const Header = ({ search, setSearch, setMarket, user, latestDate }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto h-24 px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />

          <div className="translate-y-2">
            <h1 className="text-2xl font-bold text-white">BIGFREE FX</h1>

            <p className="uppercase tracking-[5px] text-xs text-sky-400">
              Commitment of Traders
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-[320px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Market..."
            className="w-full bg-[#1b1b1b] border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-sky-500"
          />

          <span className="absolute left-4 top-3.5">🔍</span>

          {search && (
            <div className="absolute top-14 w-full bg-[#1b1b1b] rounded-xl border border-slate-700 overflow-hidden">
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

        {/* Right */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>

              <span className="text-green-400 font-semibold">LIVE</span>
            </div>

            <p className="text-xs text-slate-400">
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
