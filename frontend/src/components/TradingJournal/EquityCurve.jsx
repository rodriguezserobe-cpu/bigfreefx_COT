import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const EquityCurve = ({ trades }) => {
  let balance = 0;

  const data = trades
    .filter((t) => t.result !== "OPEN")
    .sort((a, b) => new Date(a.closeDate) - new Date(b.closeDate))
    .map((trade, index) => {
      balance += Number(trade.profit);

      return {
        trade: index + 1,
        balance,
      };
    });

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

        <XAxis dataKey="trade" stroke="#94a3b8" />

        <YAxis stroke="#94a3b8" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="balance"
          stroke="#0ea5e9"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EquityCurve;
