import MarketSelector from "./MarketSelector";

const Sidebar = ({ market, setMarket }) => {
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
      <h2 className="text-xl font-bold mb-6 text-blue-400">MARKETS</h2>

      <MarketSelector market={market} setMarket={setMarket} />
    </aside>
  );
};

export default Sidebar;
