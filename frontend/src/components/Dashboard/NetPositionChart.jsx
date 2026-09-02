import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NetPositionChart = ({ data = [], selectedReportDate }) => {
  // Convert the selected COT report date into the same
  // format used by the chart's X-axis.
  const selectedDate = selectedReportDate
    ? new Date(selectedReportDate).toLocaleDateString()
    : null;

  return (
    <div className="bg-[#0d1117]/90 backdrop-blur-xl border border-sky-500/20 shadow-xl rounded-lg p-4 sm:p-5 lg:p-5 2xl:p-7 mt-6">
      <h2 className="text-lg sm:text-xl 2xl:text-2xl font-semibold mb-4">
        Net Position History
      </h2>

      <div className="w-full h-[260px] sm:h-[320px] lg:h-[340px] 2xl:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              interval="preserveStartEnd"
              minTickGap={25}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              domain={[
                (dataMin) => dataMin - 10000,
                (dataMax) => dataMax + 10000,
              ]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#171B22",
                border: "1px solid #0ea5e9",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#94a3b8",
              }}
            />

            <Line
              type="monotone"
              dataKey="net"
              stroke="#14a3e2"
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;

                const isSelected =
                  selectedDate && payload?.date === selectedDate;

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : 4}
                    fill={isSelected ? "#38bdf8" : "#14a3e2"}
                    stroke={isSelected ? "#ffffff" : "#14a3e2"}
                    strokeWidth={isSelected ? 2 : 0}
                  />
                );
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Selected report indicator */}
      {selectedReportDate && (
        <div className="mt-3 text-center text-xs sm:text-sm text-sky-400">
          Selected report:{" "}
          {new Date(selectedReportDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
};

export default NetPositionChart;
