const COTTable = ({ data = [], selectedReport, onSelectReport }) => {
  const handleRowClick = (row) => {
    console.log("COT REPORT CLICKED:", row);
    onSelectReport(row);
  };

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

              const changeLong = previous
                ? Number(row.long || 0) - Number(previous.long || 0)
                : 0;

              const changeShort = previous
                ? Number(row.short || 0) - Number(previous.short || 0)
                : 0;

              const isSelected = selectedReport?.reportDate === row.reportDate;

              return (
                <tr
                  key={`${row.reportDate}-${index}`}
                  onClick={() => handleRowClick(row)}
                  className={`
                    text-center
                    border-b border-sky-500/20
                    text-xs sm:text-sm lg:text-base
                    cursor-pointer
                    select-none
                    transition-all
                    ${
                      isSelected
                        ? "bg-sky-500/20 ring-1 ring-inset ring-sky-400"
                        : "bg-[#0d1117]/90 hover:bg-slate-800"
                    }
                  `}
                >
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      )}

                      {new Date(row.reportDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>

                  <td className="p-3 bg-green-300 text-black whitespace-nowrap">
                    {Number(row.long || 0).toLocaleString()}
                  </td>

                  <td className="p-3 bg-red-300 text-black whitespace-nowrap">
                    {Number(row.short || 0).toLocaleString()}
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
                    className={`
                      p-3
                      text-black
                      whitespace-nowrap
                      ${
                        Number(row.net || 0) >= 0
                          ? "bg-green-200"
                          : "bg-red-200"
                      }
                    `}
                  >
                    {Number(row.net || 0).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden text-center text-slate-400 text-xs py-3 border-t border-slate-700">
        ← Swipe left or right to view the full table →
      </div>
    </div>
  );
};

export default COTTable;
