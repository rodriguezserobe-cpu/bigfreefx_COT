import { cotData } from "../data/cotData";

const COTTable = ({ market }) => {
  const rows = cotData[market];
  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full border-collapse">
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
          {rows.map((row, index) => (
            <tr
              key={index}
              className="bg-[#232323] border-b border-gray-700 text-center"
            >
              <td className="p-3">{row.date}</td>

              <td className="p-3 bg-green-300 text-black">{row.long}</td>

              <td className="p-3 bg-red-300 text-black">{row.short}</td>

              <td className="p-3">{row.changeLong}</td>

              <td className="p-3">{row.changeShort}</td>

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
