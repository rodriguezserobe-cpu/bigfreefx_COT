import MarketSelector from "./MarketSelector";

const Sidebar = ({ market, setMarket }) => {
  return (
    <aside
      className="
      fixed
      top-40
      left-0
      bottom-0
      w-52
      bg-[#151515]
      border-r
      border-gray-700
      p-5
      overflow-y-auto
      "
    >
      <h2 className="text-xl font-bold mb-6 text-blue-400">MARKETS</h2>

      <MarketSelector market={market} setMarket={setMarket} />
    </aside>
  );
};

export default Sidebar;
