/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface PieChartProps {
  data: any[];
  title: string;
  showBalance: boolean;
  colors?: string[];
  compact?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  showBalance,
  colors = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"],
  compact = false,
}) => {
  const chartData = data.map((item, index) => ({
    name: item._id || item.name || `Item ${index + 1}`,
    value: showBalance
      ? item.totalBalance || item.totalLoanAmount || 0
      : item.count,
    count: item.count,
    color: colors[index % colors.length],
  }));

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={compact ? "10" : "12"}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${compact ? "p-4" : "p-6"}`}>
      <h3
        className={`${
          compact ? "text-sm" : "text-lg"
        } font-semibold text-gray-800 mb-4`}
      >
        {title}
      </h3>
      <div className={compact ? "h-48" : "h-64"}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={compact ? 60 : 80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                showBalance ? `$${Number(value).toLocaleString()}` : value,
                name,
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: compact ? "10px" : "12px" }}
              formatter={(value: string, entry: any) => (
                <span style={{ color: entry.color }}>
                  {value} ({entry.payload.count})
                </span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
