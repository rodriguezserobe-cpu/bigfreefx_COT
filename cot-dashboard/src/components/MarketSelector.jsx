const MarketSelector = ({ market, setMarket }) => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      <select
        value={market}
        onChange={(e) => setMarket(e.target.value)}
        className="bg-[#232323] border border-gray-600 p-2"
      >
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="GOLD">GOLD</option>
      </select>
    </div>
  );
};

export default MarketSelector;
