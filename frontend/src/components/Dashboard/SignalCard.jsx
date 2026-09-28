const SignalCard = ({ latest, marketName, group }) => {
  if (!latest) return null;

  const net = Number(latest.net || 0);
  const openInterest = Number(latest.openInterest || 1);

  const strength = Math.min(
    100,
    Math.round((Math.abs(net) / openInterest) * 100),
  );

  const bullish = latest.bias === "Bullish";
  const bearish = latest.bias === "Bearish";

  const selectedLong = Number(latest.longPct || 0);
  const selectedShort = Number(latest.shortPct || 0);

  // The percentage not represented by Long or Short
  const neutral = Math.max(0, 100 - selectedLong - selectedShort);

  // Name of the currently selected COT group
  const groupNames = {
    commercial: "Commercials",
    nonCommercial: "Non-Commercials",
    retail: "Retail Traders",
  };

  const selectedGroupName = groupNames[group] || "Selected Group";

  // HOLD is neutral
  //const signalIsNeutral = !bullish && !bearish;

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl rounded-lg p-4 sm:p-5 lg:p-5 2xl:p-7 mb-6">
      <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold mb-6">
        BIGFREE FX SIGNAL
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 2xl:gap-10">
        {/* LEFT */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm">Market</p>

              <p className="text-lg sm:text-xl font-semibold">{marketName}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Bias</p>

              <p
                className={
                  bullish
                    ? "text-green-400"
                    : bearish
                      ? "text-red-400"
                      : "text-yellow-400"
                }
              >
                {bullish ? "Bullish 🟢" : bearish ? "Bearish 🔴" : "Neutral 🟡"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Strength</p>

              <p>{strength}%</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Action</p>

              <p
                className={
                  bullish
                    ? "text-green-400"
                    : bearish
                      ? "text-red-400"
                      : "text-yellow-400"
                }
              >
                {bullish ? "BUY" : bearish ? "SELL" : "HOLD"}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Signal Strength</span>

              <span>{strength}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className={
                  bullish
                    ? "bg-green-500 h-3 rounded-full"
                    : bearish
                      ? "bg-red-500 h-3 rounded-full"
                      : "bg-yellow-500 h-3 rounded-full"
                }
                style={{
                  width: `${strength}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-4 border-t sm:border-t-0 lg:border-l border-gray-700 pt-6 sm:pt-0 lg:pl-6">
          {/* BULLISH */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">{selectedGroupName}</p>

            <p className="text-green-400 mb-3">Bullish</p>

            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${selectedLong}%`,
                }}
              />
            </div>

            <p className="mt-2">{selectedLong.toFixed(1)}%</p>
          </div>

          {/* BEARISH */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">{selectedGroupName}</p>

            <p className="text-red-400 mb-3">Bearish</p>

            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${selectedShort}%`,
                }}
              />
            </div>

            <p className="mt-2">{selectedShort.toFixed(1)}%</p>
          </div>

          {/* NEUTRAL */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">{selectedGroupName}</p>

            <p className="text-yellow-400 mb-3">Neutral</p>

            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${neutral}%`,
                }}
              />
            </div>

            <p className="mt-2">{neutral.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;
