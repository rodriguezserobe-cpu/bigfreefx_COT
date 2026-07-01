import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NetPositionChart = ({ data }) => {
  return (
    <div className=" bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl rounded-lg p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">Net Position History</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" />

          <XAxis dataKey="date" />

          <YAxis
            domain={[
              (dataMin) => dataMin - 10000,
              (dataMax) => dataMax + 10000,
            ]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="net"
            stroke="#14a3e2"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetPositionChart;
