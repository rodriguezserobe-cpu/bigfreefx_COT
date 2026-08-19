import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MonthlyPerformanceChart = ({ trades }) => {
  const monthly = {};

  trades
    .filter((t) => t.result !== "OPEN")
    .forEach((trade) => {
      const month = new Date(trade.closeDate).toLocaleString("default", {
        month: "short",
      });

      monthly[month] = (monthly[month] || 0) + Number(trade.profit);
    });

  const data = Object.keys(monthly).map((month) => ({
    month,
    profit: monthly[month],
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />
        <Bar dataKey="profit" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyPerformanceChart;
