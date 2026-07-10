const COTTable = ({ data = [] }) => {
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th className="p-3">DATE</th>
            <th className="p-3">LONG</th>
            <th className="p-3">SHORT</th>
            <th className="p-3">CHANGE LONG</th>
            <th className="p-3">CHANGE SHORT</th>
            <th className="p-3">% LONG</th>
            <th className="p-3">% SHORT</th>
            <th className="p-3">NET POSITION</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => {
            const previous = data[index + 1];

            const changeLong = previous ? row.long - previous.long : 0;

            const changeShort = previous ? row.short - previous.short : 0;

            return (
              <tr
                key={`${row.reportDate}-${index}`}
                className="text-center bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl"
              >
                <td className="p-3">
                  {new Date(row.reportDate).toLocaleDateString()}
                </td>

                <td className="p-3 bg-green-300 text-black">
                  {row.long.toLocaleString()}
                </td>

                <td className="p-3 bg-red-300 text-black">
                  {row.short.toLocaleString()}
                </td>

                <td className="p-3 text-green-400">
                  {changeLong >= 0
                    ? `+${changeLong.toLocaleString()}`
                    : changeLong.toLocaleString()}
                </td>

                <td className="p-3 text-red-400">
                  {changeShort >= 0
                    ? `+${changeShort.toLocaleString()}`
                    : changeShort.toLocaleString()}
                </td>

                <td className="p-3">{row.longPct}%</td>

                <td className="p-3">{row.shortPct}%</td>

                <td
                  className={`p-3 text-black ${
                    row.net >= 0 ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  {row.net.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default COTTable;
