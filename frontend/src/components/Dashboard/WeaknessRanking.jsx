const WeaknessRanking = ({ latest }) => {
  const ranking = Object.entries(latest)
    .sort((a, b) => a[1].net - b[1].net)
    .slice(0, 5);

  return (
    <div className="bg-[#232323] border border-gray-700 rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">Weakest Markets</h2>

      {ranking.map(([code, item], index) => (
        <div
          key={code}
          className="flex justify-between py-2 border-b border-gray-700"
        >
          <span>
            #{index + 1} {code}
          </span>

          <span className="text-red-400">{item.net.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default WeaknessRanking;
