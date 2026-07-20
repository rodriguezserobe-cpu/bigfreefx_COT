const WeeklyChangeCard = ({ history }) => {
  if (!history || history.length < 2) return null;

  const current = history[0];
  const previous = history[1];

  const currentNet = current?.net ?? 0;
  const previousNet = previous?.net ?? 0;

  const change = currentNet - previousNet;

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border border-sky-500/20 shadow-xl rounded-lg p-4 sm:p-5 lg:p-5 2xl:p-7 mt-6">
      <h2 className="text-lg sm:text-xl 2xl:text-2xl font-bold mb-5">
        Weekly Position Change
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-4">
        <div className="bg-[#161b22] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-2">Previous Net</p>

          <p className="text-lg sm:text-xl font-semibold text-white">
            {previousNet.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#161b22] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-2">Current Net</p>

          <p className="text-lg sm:text-xl font-semibold text-white">
            {currentNet.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#161b22] rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-2">Change</p>

          <p
            className={`text-lg sm:text-xl font-semibold ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChangeCard;
