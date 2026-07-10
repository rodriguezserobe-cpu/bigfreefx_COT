const marketTypes = ["FOREX", "METALS", "INDICES", "CRYPTO"];

const MarketSelector = ({ marketType, setMarketType }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-400 mb-2">Market</label>

      <select
        value={marketType}
        onChange={(e) => setMarketType(e.target.value)}
        className="
          w-full
          bg-[#161b22]
          border
          border-sky-500/20
          rounded-lg
          p-2
          text-white
          outline-none
          focus:border-sky-500
        "
      >
        {marketTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MarketSelector;
