import { markets } from "../../data/markets";

const groups = {
  Forex: ["EUR", "GBP", "USD", "JPY", "AUD", "NZD", "CAD", "CHF"],
  Metals: ["XAU", "XAG"],
  Indices: ["US30", "NAS100", "SPX500"],
  Crypto: ["BTC", "ETH", "XRP", "SOL"],
};

const MarketSelector = ({ market, setMarket }) => {
  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([group, codes]) => (
        <div key={group}>
          <h3 className="text-blue-400 font-bold uppercase text-sm tracking-wider mb-3 border-b border-gray-700 pb-2">
            {group}
          </h3>

          <div className="space-y-2">
            {codes.map((code) => {
              const item = markets.find((m) => m.code === code);

              return (
                <button
                  key={code}
                  onClick={() => setMarket(code)}
                  className={`w-full text-left px-4 py-2 rounded transition-all duration-200
                    ${
                      market === code
                        ? "bg-blue-500 text-black font-bold"
                        : "hover:bg-[#242424] text-white"
                    }`}
                >
                  {item?.name || code}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketSelector;
