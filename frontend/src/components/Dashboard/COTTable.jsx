const COTTable = ({ data = [] }) => {
  return (
    <div className="mt-10 bg-[#0d1117]/90 backdrop-blur-xl border border-sky-500/20 rounded-xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="bg-sky-500 text-white text-xs sm:text-sm lg:text-base">
              <th className="p-3 whitespace-nowrap">DATE</th>
              <th className="p-3 whitespace-nowrap">LONG</th>
              <th className="p-3 whitespace-nowrap">SHORT</th>
              <th className="p-3 whitespace-nowrap">CHANGE LONG</th>
              <th className="p-3 whitespace-nowrap">CHANGE SHORT</th>
              <th className="p-3 whitespace-nowrap">% LONG</th>
              <th className="p-3 whitespace-nowrap">% SHORT</th>
              <th className="p-3 whitespace-nowrap">NET POSITION</th>
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
                  className="text-center bg-[#0d1117]/90 border-b border-sky-500/20 hover:bg-slate-800 transition text-xs sm:text-sm lg:text-base"
                >
                  <td className="p-3 whitespace-nowrap">
                    {new Date(row.reportDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-3 bg-green-300 text-black whitespace-nowrap">
                    {row.long.toLocaleString()}
                  </td>

                  <td className="p-3 bg-red-300 text-black whitespace-nowrap">
                    {row.short.toLocaleString()}
                  </td>

                  <td className="p-3 text-green-400 whitespace-nowrap">
                    {changeLong >= 0
                      ? `+${changeLong.toLocaleString()}`
                      : changeLong.toLocaleString()}
                  </td>

                  <td className="p-3 text-red-400 whitespace-nowrap">
                    {changeShort >= 0
                      ? `+${changeShort.toLocaleString()}`
                      : changeShort.toLocaleString()}
                  </td>

                  <td className="p-3 whitespace-nowrap">{row.longPct}%</td>

                  <td className="p-3 whitespace-nowrap">{row.shortPct}%</td>

                  <td
                    className={`p-3 text-black whitespace-nowrap ${
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

      {/* Mobile hint */}
      <div className="lg:hidden text-center text-slate-400 text-xs py-3 border-t border-slate-700">
        ← Swipe left or right to view the full table →
      </div>
    </div>
  );
};

export default COTTable;
