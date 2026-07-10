const StrengthRanking = ({ latest }) => {
  const ranking = Object.entries(latest)
    .sort((a, b) => (b[1]?.net ?? 0) - (a[1]?.net ?? 0))
    .slice(0, 5);

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">Strongest Markets</h2>

      {ranking.map(([code, item], index) => (
        <div
          key={code}
          className="flex justify-between py-2 border-b border-gray-700"
        >
          <span>
            #{index + 1} {code}
          </span>

          <span className="text-green-400">
            {(item?.net ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StrengthRanking;
