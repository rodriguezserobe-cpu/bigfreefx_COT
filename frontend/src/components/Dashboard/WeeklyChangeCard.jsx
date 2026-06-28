const WeeklyChangeCard = ({ history }) => {
  if (!history || history.length < 2) return null;

  const current = history[0];
  const previous = history[1];

  const change = current.net - previous.net;

  return (
    <div className="bg-[#232323] border border-gray-700 rounded-lg p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">Weekly Position Change</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-400">Previous Net</p>
          <p>{previous.net.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-400">Current Net</p>
          <p>{current.net.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-400">Change</p>

          <p className={change > 0 ? "text-green-400" : "text-red-400"}>
            {change.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChangeCard;
