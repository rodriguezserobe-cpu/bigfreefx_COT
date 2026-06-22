const SignalCard = ({ latest, marketName }) => {
  const strength = Math.min(100, Math.round(Math.abs(latest.net) / 5000));

  const bullish = latest?.bias === "Bullish";

  return (
    <div className="bg-[#232323] border border-gray-700 rounded-lg p-5 mb-6">
      <h2 className="text-3xl font-bold mb-6">BIGFREE FX SIGNAL</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm">Market</p>
              <p className="text-xl font-semibold">{marketName}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Bias</p>
              <p className={bullish ? "text-green-400" : "text-red-400"}>
                {bullish ? "Bullish 🟢" : "Bearish 🔴"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Strength</p>
              <p>{strength}%</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Action</p>
              <p className={bullish ? "text-green-400" : "text-red-400"}>
                {bullish ? "BUY" : "SELL"}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Signal Strength</span>
              <span>{strength}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: `${strength}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-3 gap-4 border-l border-gray-700 pl-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Commercials</p>

            <p className="text-green-400 mb-3">Bullish</p>

            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "72%" }}
              />
            </div>

            <p className="mt-2">72%</p>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">Non-Commercials</p>

            <p className="text-red-400 mb-3">Bearish</p>

            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: "21%" }}
              />
            </div>

            <p className="mt-2">21%</p>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">Retail Traders</p>

            <p className="text-red-400 mb-3">Bearish</p>

            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: "7%" }}
              />
            </div>

            <p className="mt-2">7%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;
