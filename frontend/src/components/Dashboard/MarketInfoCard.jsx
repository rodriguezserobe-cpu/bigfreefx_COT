const MarketInfoCard = ({ marketName, latest }) => {
  if (!latest) return null;

  const net = latest.net || 0;

  const bias = latest.bias || "Neutral";

  const longPct = latest.longPct || "0.00";

  const shortPct = latest.shortPct || "0.00";

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center flex-wrap gap-6">
        <div>
          <p className="text-gray-400 text-sm">Market</p>
          <h2 className="text-xl font-semibold">{marketName}</h2>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Net Position</p>
          <p
            className={`font-semibold ${
              net >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {net.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Bias</p>
          <p>{bias}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Long %</p>
          <p className="text-green-400">{longPct}%</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Short %</p>
          <p className="text-red-400">{shortPct}%</p>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoCard;
