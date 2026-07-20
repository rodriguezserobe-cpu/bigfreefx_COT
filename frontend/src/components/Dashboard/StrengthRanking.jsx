const StrengthRanking = ({ latest }) => {
  const ranking = Object.entries(latest)
    .sort((a, b) => (b[1]?.net ?? 0) - (a[1]?.net ?? 0))
    .slice(0, 5);

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border border-sky-500/20 shadow-xl rounded-lg p-4 sm:p-5 lg:p-5 2xl:p-7">
      <h2 className="text-lg sm:text-xl 2xl:text-2xl font-bold mb-5">
        Strongest Markets
      </h2>

      <div className="space-y-3">
        {ranking.map(([code, item], index) => (
          <div
            key={code}
            className="flex items-center justify-between bg-[#161b22] rounded-lg px-4 py-3 hover:bg-[#1d2430] transition"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>

              <span className="font-semibold text-white text-sm sm:text-base">
                {code}
              </span>
            </div>

            <span className="text-green-400 font-semibold text-sm sm:text-base whitespace-nowrap">
              {(item?.net ?? 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthRanking;
