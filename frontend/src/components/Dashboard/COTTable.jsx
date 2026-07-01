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
            <th className="p-3">NET POSITIONS</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.date}
              className=" text-center bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl"
            >
              <td className="p-3">{row.date}</td>

              <td className="p-3 bg-green-300 text-black">{row.long}</td>

              <td className="p-3 bg-red-300 text-black">{row.short}</td>

              <td className="p-3 text-green-400">{row.changeLong}</td>

              <td className="p-3 text-red-400">{row.changeShort}</td>

              <td className="p-3">{row.longPct}</td>

              <td className="p-3">{row.shortPct}</td>

              <td className="p-3 bg-green-200 text-black">{row.net}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default COTTable;
