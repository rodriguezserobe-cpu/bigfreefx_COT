const WeeklyChangeCard = ({ history }) => {
  if (!history || history.length < 2) return null;

  const current = history[0];
  const previous = history[1];

  const currentNet = current?.nonCommercial?.net ?? 0;
  const previousNet = previous?.nonCommercial?.net ?? 0;

  const change = currentNet - previousNet;

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl rounded-lg p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">Weekly Position Change</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-400">Previous Net</p>
          <p>{previousNet.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-400">Current Net</p>
          <p>{currentNet.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-400">Change</p>

          <p className={change >= 0 ? "text-green-400" : "text-red-400"}>
            {change.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChangeCard;
