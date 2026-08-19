import { X } from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { FaChartLine, FaBookOpen } from "react-icons/fa";

import MarketSelector from "./MarketSelector";
import AssetSelector from "./AssetSelector";
import GroupSelector from "./GroupSelector";

const Sidebar = ({
  marketType,
  setMarketType,
  market,
  setMarket,
  group,
  setGroup,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  return (
    <>
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed
          top-20
          lg:top-32
          left-0
          bottom-0

          w-[220px]
          sm:w-[230px]
          md:w-[240px]
          lg:w-52
          2xl:w-80

          bg-[#0d1117]/95
          backdrop-blur-xl
          border-r
          border-sky-500/20
          shadow-xl

          overflow-y-auto

          p-5
          2xl:p-8

          z-50

          transform
          transition-transform
          duration-300

          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center lg:hidden mb-6">
          <h2 className="text-xl font-bold text-sky-400">MARKET</h2>

          <button
            onClick={() => setMobileOpen(false)}
            className="text-white hover:text-sky-400 transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Desktop Header */}
        <h2 className="hidden lg:block text-xl 2xl:text-2xl font-bold mb-6 text-sky-400">
          MARKET
        </h2>
        <div className="space-y-6 2xl:space-y-8">
          <MarketSelector
            marketType={marketType}
            setMarketType={setMarketType}
          />

          <AssetSelector
            marketType={marketType}
            market={market}
            setMarket={setMarket}
          />

          <GroupSelector group={group} setGroup={setGroup} />
        </div>

        {/* Main Navigation */}
        <div className="mb-6 2xl:mb-8 space-y-2 2xl:space-y-3">
          <Link
            to="/bigfreefxhub"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 2xl:px-4 2xl:py-4 transition text-sm 2xl:text-base ${
              location.pathname === "/bigfreefxhub"
                ? "bg-sky-500 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <FaChartLine className="shrink-0" />
            <span>BigFreeFx Hub</span>
          </Link>

          <Link
            to="/journal"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 2xl:px-4 2xl:py-4 transition text-sm 2xl:text-base ${
              location.pathname.startsWith("/journal")
                ? "bg-sky-500 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <FaBookOpen className="shrink-0" />
            <span>Trading Journal</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
