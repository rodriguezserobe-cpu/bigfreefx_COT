export default function StatCard({ title, value, color = "sky" }) {
  const colors = {
    sky: "border-sky-500 text-sky-400",
    green: "border-green-500 text-green-400",
    yellow: "border-yellow-500 text-yellow-400",
    red: "border-red-500 text-red-400",
  };

  return (
    <div
      className={`
        bg-[#171b22]
        rounded-2xl
        p-6
        border
        ${colors[color]}
        shadow-lg
        hover:scale-105
        transition
        duration-300
      `}
    >
      <p className="text-slate-400 text-sm uppercase tracking-wider">{title}</p>

      <h2 className="text-4xl font-bold mt-4">{value}</h2>
    </div>
  );
}
