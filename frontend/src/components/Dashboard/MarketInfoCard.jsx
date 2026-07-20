const MarketInfoCard = ({ marketName, latest }) => {
  if (!latest) return null;

  const net = latest.net || 0;
  const bias = latest.bias || "Neutral";
  const longPct = latest.longPct || "0.00";
  const shortPct = latest.shortPct || "0.00";

  return (
    <div
      className="
        bg-[#0d1117]/90
        backdrop-blur-xl
        border-b
        border-sky-500/20
        shadow-xl
        rounded-lg

        p-4
        sm:p-5
        lg:p-4
        2xl:p-6

        mb-6
      "
    >
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:flex
          lg:justify-between
          lg:items-center

          gap-5
          lg:gap-6
          2xl:gap-10
        "
      >
        <div>
          <p className="text-gray-400 text-xs sm:text-sm 2xl:text-base">
            Market
          </p>

          <h2 className="text-lg sm:text-xl 2xl:text-2xl font-semibold">
            {marketName}
          </h2>
        </div>

        <div>
          <p className="text-gray-400 text-xs sm:text-sm 2xl:text-base">
            Net Position
          </p>

          <p
            className={`font-semibold text-sm sm:text-base 2xl:text-xl ${
              net >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {net.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs sm:text-sm 2xl:text-base">Bias</p>

          <p className="text-sm sm:text-base 2xl:text-xl">{bias}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs sm:text-sm 2xl:text-base">
            Long %
          </p>

          <p className="text-green-400 text-sm sm:text-base 2xl:text-xl">
            {longPct}%
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs sm:text-sm 2xl:text-base">
            Short %
          </p>

          <p className="text-red-400 text-sm sm:text-base 2xl:text-xl">
            {shortPct}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoCard;
