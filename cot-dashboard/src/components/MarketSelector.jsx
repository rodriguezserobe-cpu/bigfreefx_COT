import { markets } from "../data/markets";

const MarketSelector = ({ market, setMarket }) => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      <select
        value={market}
        onChange={(e) => setMarket(e.target.value)}
        className="bg-[#232323] border border-gray-600 p-2"
      >
        {markets.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MarketSelector;
