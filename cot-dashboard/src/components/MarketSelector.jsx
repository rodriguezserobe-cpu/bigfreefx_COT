const MarketSelector = () => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      <select className="bg-[#232323] border border-gray-600 p-2">
        <option>EUR</option>
        <option>GBP</option>
        <option>JPY</option>
        <option>GOLD</option>
      </select>

      <select className="bg-[#232323] border border-gray-600 p-2">
        <option>EURO FX</option>
      </select>
    </div>
  );
};

export default MarketSelector;
