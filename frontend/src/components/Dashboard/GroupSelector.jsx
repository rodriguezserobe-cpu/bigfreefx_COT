const groups = [
  {
    value: "nonCommercial",
    label: "Non-Commercials",
  },
  {
    value: "commercial",
    label: "Commercials",
  },
  {
    value: "retail",
    label: "Retail",
  },
];

const GroupSelector = ({ group, setGroup }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-400 mb-2">Group</label>

      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="
          w-full
          bg-[#161b22]
          border
          border-sky-500/20
          rounded-lg
          p-2
          text-white
          outline-none
          focus:border-sky-500
        "
      >
        {groups.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupSelector;
