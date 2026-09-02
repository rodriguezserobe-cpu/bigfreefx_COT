const MarketSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-sky-400 mt-6 mb-4">
        {title}
      </h2>

      <div className="bg-[#0d1117]/90 backdrop-blur-xl border border-sky-500/20 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead className="bg-[#161b22]">
              <tr className="text-sm lg:text-base">
                <th className="text-left p-3 whitespace-nowrap">Market</th>

                <th className="text-center p-3 whitespace-nowrap">Signal</th>

                <th className="text-center p-3 whitespace-nowrap">
                  Confidence
                </th>

                <th className="text-right p-3 whitespace-nowrap">
                  Strength Score
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => {
                const signal = item.signal || "";

                const signalColor = signal.includes("BUY")
                  ? "text-green-400"
                  : signal.includes("SELL")
                    ? "text-red-400"
                    : "text-yellow-400";

                return (
                  <tr
                    key={item.symbol}
                    className="border-t border-gray-700 hover:bg-[#161b22] transition text-sm lg:text-base"
                  >
                    <td className="p-3 font-semibold whitespace-nowrap">
                      {item.symbol}
                    </td>

                    <td
                      className={`text-center font-bold ${signalColor} whitespace-nowrap`}
                    >
                      {signal}
                    </td>

                    <td className="text-center text-gray-300 whitespace-nowrap">
                      {item.confidence}
                    </td>

                    <td className="text-right p-3 whitespace-nowrap">
                      {Number(item.strength || 0).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden text-center text-slate-400 text-xs py-3 border-t border-slate-700">
          ← Swipe left or right to view the full table →
        </div>
      </div>
    </div>
  );
};

const MarketScanner = ({ signals, marketType, asset }) => {
  if (!signals) return null;

  switch (marketType) {
    case "FOREX":
      return (
        <MarketSection
          title="FOREX"
          data={(signals.forex || []).filter((item) =>
            item.symbol.includes(asset),
          )}
        />
      );

    case "METALS":
      return (
        <MarketSection
          title="METALS"
          data={(signals.metals || []).filter((item) =>
            item.symbol.includes(asset),
          )}
        />
      );

    case "INDICES":
      return (
        <MarketSection
          title="INDICES"
          data={(signals.indices || []).filter((item) => item.symbol === asset)}
        />
      );

    case "CRYPTO":
      return (
        <MarketSection
          title="CRYPTO"
          data={(signals.crypto || []).filter((item) =>
            item.symbol.includes(asset),
          )}
        />
      );

    default:
      return null;
  }
};

export default MarketScanner;
