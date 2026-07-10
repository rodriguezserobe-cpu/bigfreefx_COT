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
}) => {
  return (
    <aside
      className="
      fixed
      top-32
      left-0
      bottom-0
      w-52
      bg-[#0d1117]/90
      border-b
      border-sky-500/20
      shadow-xl
      backdrop-blur-xl
      p-5
      overflow-y-auto
      "
    >
      <h2 className="text-xl font-bold mb-6 text-blue-400">MARKET</h2>

      <MarketSelector marketType={marketType} setMarketType={setMarketType} />

      <AssetSelector
        marketType={marketType}
        market={market}
        setMarket={setMarket}
      />

      <GroupSelector group={group} setGroup={setGroup} />
    </aside>
  );
};

export default Sidebar;
