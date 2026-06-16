const cotData = [
  {
    date: "2022-12-20",
    long: "249,149",
    short: "106,877",
    changeLong: "12,734",
    changeShort: "-4,823",
    longPct: "34.3%",
    shortPct: "14.7%",
    net: "142,272",
  },
  {
    date: "2022-12-13",
    long: "236,415",
    short: "111,700",
    changeLong: "-8,648",
    changeShort: "-8,480",
    longPct: "30.6%",
    shortPct: "14.5%",
    net: "124,715",
  },
];

const COTTable = () => {
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
          {cotData.map((row, index) => (
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
