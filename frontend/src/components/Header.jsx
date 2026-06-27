import logo from "../assets/logo.png";
import { markets } from "../data/markets";

const Header = ({ search, setSearch, setMarket }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-sky-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-300">
      <div className="max-w-[1800px] mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <img
              src={logo}
              alt="Logo"
              className="w-26 h-26 object-contain translate-y-0 transition-transform duration-300 hover:scale-105"
            />

            <div className="translate-y-3">
              <h1 className="text-2xl xl:text-2xl font-bold tracking-wide text-white transition-colors duration-300">
                BIGFREE FX TRADING
              </h1>

              <p className="uppercase tracking-[0.35em] text-xs text-gray-400">
                Commitment of Traders
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-8">
            <div className="relative transition-all duration-300 hover:scale-[1.02]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Market..."
                className="w-72 bg-[#1b1b1b] border border-[#333] rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
              />

              <span className="absolute left-3 top-3 text-gray-400">🔍</span>

              {search && (
                <div className="absolute top-14 left-0 w-full bg-[#1b1b1b] border border-[#333] rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                  {markets
                    .filter(
                      (item) =>
                        item.code
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
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

            <div className="text-right">
              <div className="flex items-center gap-2 justify-end bg-[#1d1d1d] px-3 py-2 rounded-xl border border-[#2a2a2a]">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#22c55e]"></span>

                <span className="text-green-400 font-semibold">LIVE</span>
              </div>

              <p className="text-xs text-gray-400">Updated 23 Jun 2026</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
