import { markets } from "../data/markets";

const MarketSelector = ({ market, setMarket }) => {
  const selectedMarket = markets.find((item) => item.code === market);

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
      {/* Dropdown */}
      <select
        value={market}
        onChange={(e) => setMarket(e.target.value)}
        className="bg-[#232323] border border-gray-600 px-4 py-2 text-white"
      >
        {markets.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code}
          </option>
        ))}
      </select>

      {/* Display Only */}
      <div className="bg-[#232323] border border-gray-600 px-4 py-2 min-w-[180px] text-white">
        {selectedMarket?.name}
      </div>
    </div>
  );
};

export default MarketSelector;
