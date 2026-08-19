import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

const WinLossPieChart = ({ trades }) => {
  const data = [
    {
      name: "Win",
      value: trades.filter((t) => t.result === "WIN").length,
    },
    {
      name: "Loss",
      value: trades.filter((t) => t.result === "LOSS").length,
    },
    {
      name: "BE",
      value: trades.filter((t) => t.result === "BE").length,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={85}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default WinLossPieChart;
