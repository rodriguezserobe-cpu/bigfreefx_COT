const COTTable = ({ data }) => {
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
          <tr className="bg-[#232323] text-center">
            <td className="p-3">{data?.date}</td>

            <td className="p-3 bg-green-300 text-black">{data?.long}</td>

            <td className="p-3 bg-red-300 text-black">{data?.short}</td>

            <td className="p-3 text-green-400">{data?.changeLong}</td>

            <td className="p-3 text-red-400">{data?.changeShort}</td>

            <td className="p-3">{data?.longPct}</td>

            <td className="p-3">{data?.shortPct}</td>

            <td className="p-3 bg-green-200 text-black">{data?.net}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default COTTable;
