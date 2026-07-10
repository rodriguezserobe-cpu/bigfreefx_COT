const marketAssets = {
  FOREX: ["EUR", "GBP", "JPY", "AUD", "NZD", "CAD", "CHF", "DXY"],

  METALS: ["XAUUSD", "SILVER"],

  INDICES: ["US30", "NAS100", "SPX500"],

  CRYPTO: ["BTCUSD"],

  AGRICULTURE: [],

  ENERGY: [],
};

const AssetSelector = ({ marketType, market, setMarket }) => {
  const assets = marketAssets[marketType] || [];

  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-400 mb-2">Asset</label>

      <select
        value={market}
        onChange={(e) => setMarket(e.target.value)}
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
        {assets.map((asset) => (
          <option key={asset} value={asset}>
            {asset}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AssetSelector;
