import { X } from "lucide-react";

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
      </aside>
    </>
  );
};

export default Sidebar;
