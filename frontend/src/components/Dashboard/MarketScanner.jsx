const MarketSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-sky-400 mt-6">{title}</h2>

      <div className="bg-[#0d1117]/90 backdrop-blur-xl border border-sky-500/20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#161b22]">
            <tr>
              <th className="text-left p-3">Market</th>
              <th className="text-center p-3">Signal</th>
              <th className="text-center p-3">Confidence</th>
              <th className="text-right p-3">Strength Score</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const signalColor = item.signal.includes("BUY")
                ? "text-green-400"
                : item.signal.includes("SELL")
                  ? "text-red-400"
                  : "text-yellow-400";

              return (
                <tr
                  key={item.symbol}
                  className="border-t border-gray-700 hover:bg-[#161b22]"
                >
                  <td className="p-3 font-semibold">{item.symbol}</td>

                  <td className={`text-center font-bold ${signalColor}`}>
                    {item.signal}
                  </td>

                  <td className="text-center text-gray-300">
                    {item.confidence}
                  </td>

                  <td className="text-right p-3">{item.strength.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MarketScanner = ({ signals, marketType, asset }) => {
  if (!signals) return null;

  let filteredData = [];
  let title = "";

  switch (marketType) {
    case "FOREX":
      title = "FOREX";

      filteredData = (signals.forex || []).filter((item) =>
        item.symbol.includes(asset),
      );
      break;

    case "METALS":
      title = "METALS";

      filteredData = (signals.metals || []).filter((item) =>
        item.symbol.includes(asset),
      );
      break;

    case "INDICES":
      title = "INDICES";

      filteredData = (signals.indices || []).filter(
        (item) => item.symbol === asset,
      );
      break;

    case "CRYPTO":
      title = "CRYPTO";

      filteredData = (signals.crypto || []).filter((item) =>
        item.symbol.includes(asset),
      );
      break;

    default:
      filteredData = [];
  }

  return <MarketSection title={title} data={filteredData} />;
};

export default MarketScanner;
