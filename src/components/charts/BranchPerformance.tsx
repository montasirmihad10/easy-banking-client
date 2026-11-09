/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BranchPerformanceProps {
  data: any[];
  title: string;
  compact?: boolean;
}

const BranchPerformance: React.FC<BranchPerformanceProps> = ({
  data,
  title,
  compact = false,
}) => {
  const chartData = data.map((branch) => ({
    name: branch.branchName || branch._id,
    accounts: branch.totalAccounts || 0,
    balance: branch.totalBalance || 0,
    transactions: branch.totalTransactions || 0,
  }));

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
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={compact ? 10 : 12} />
            <YAxis fontSize={compact ? 10 : 12} />
            <Tooltip
              formatter={(value, name) => [
                name === "balance"
                  ? `$${Number(value).toLocaleString()}`
                  : value,
                String(name ?? "").charAt(0).toUpperCase() +
                  String(name ?? "").slice(1),
              ]}
            />
            <Bar dataKey="accounts" fill="#1e40af" name="Accounts" />
            <Bar dataKey="transactions" fill="#059669" name="Transactions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BranchPerformance;
