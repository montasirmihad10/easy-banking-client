/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { Doughnut, Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartCardProps {
  type: "doughnut" | "pie" | "bar" | "horizontalBar" | "line" | "multiBar";
  data: any[];
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colors: string[];
  showBalance?: boolean;
  showDetails?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  type,
  data,
  title,
  subtitle,
  icon,
  colors,
  showBalance = false,
  showDetails = false,
}) => {
  const getChartData = () => {
    switch (type) {
      case "line":
        const processedData = data.reduce((acc: any, item: any) => {
          const day = item._id.day;
          if (!acc[day]) {
            acc[day] = { day, total: 0 };
          }
          acc[day].total += item.dailyAmount;
          return acc;
        }, {});
        const sortedData = Object.values(processedData).sort(
          (a: any, b: any) => a.day - b.day
        );

        return {
          labels: sortedData.map((item: any) => `Day ${item.day}`),
          datasets: [
            {
              label: "Daily Transaction Amount",
              data: sortedData.map((item: any) => item.total),
              borderColor: colors[0],
              backgroundColor: `${colors[0]}20`,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: colors[0],
              pointBorderColor: "white",
              pointBorderWidth: 2,
              pointRadius: 6,
            },
          ],
        };

      case "multiBar":
        return {
          labels: data.map((branch) => branch._id[0] || "Unknown Branch"),
          datasets: [
            {
              label: "Accounts",
              data: data.map((branch) => branch.count),
              backgroundColor: `${colors[0]}CC`,
              borderColor: colors[0],
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Liquidity Ratio (%)",
              data: data.map((branch) => branch.liquidityRatio || 0),
              backgroundColor: `${colors[1]}CC`,
              borderColor: colors[1],
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        };

      default:
        return {
          labels: data.map((item) => item._id || "Unknown"),
          datasets: [
            {
              label: showBalance ? "Amount" : "Count",
              data: data.map((item) =>
                showBalance
                  ? item.totalBalance ||
                    item.totalLoanAmount ||
                    item.totalAmount ||
                    0
                  : item.count
              ),
              backgroundColor: colors.map((color) => `${color}CC`),
              borderColor: colors,
              borderWidth: 2,
              ...(type.includes("bar") && {
                borderRadius: 8,
                borderSkipped: false,
              }),
              ...(type === "doughnut" && { cutout: "60%" }),
            },
          ],
        };
    }
  };

  const getChartOptions = (): ChartOptions<any> => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: type === "line" || type === "multiBar" ? "top" : "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            font: { size: 12, weight: "500" },
          },
          ...(type === "line" && { display: false }),
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "white",
          bodyColor: "white",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: (context: any) => {
              if (type === "doughnut" || type === "pie") {
                const total = context.dataset.data.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              }
              return showBalance
                ? `${context.dataset.label}: $${
                    context.parsed.y?.toLocaleString() ||
                    context.parsed.toLocaleString()
                  }`
                : `${context.dataset.label}: ${
                    context.parsed.y || context.parsed
                  }`;
            },
          },
        },
      },
      animation: { duration: 1000, easing: "easeOutQuart" },
    };

    if (type.includes("bar") || type === "line") {
      return {
        ...baseOptions,
        ...(type === "horizontalBar" && { indexAxis: "y" }),
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 12, weight: "500" } },
          },
          y: {
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: {
              font: { size: 12 },
              ...(showBalance && {
                callback: (value: any) => `$${Number(value).toLocaleString()}`,
              }),
            },
          },
        },
      };
    }

    return baseOptions;
  };

  const renderChart = () => {
    const chartData = getChartData();
    const options = getChartOptions();

    switch (type) {
      case "doughnut":
        return <Doughnut data={chartData} options={options} />;
      case "pie":
        return <Pie data={chartData} options={options} />;
      case "bar":
      case "horizontalBar":
      case "multiBar":
        return <Bar data={chartData} options={options} />;
      case "line":
        return <Line data={chartData} options={options} />;
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-slate-600">{subtitle}</p>
        </div>
        <div className="text-blue-500">{icon}</div>
      </div>

      <div className={type === "multiBar" ? "h-96" : "h-80"}>
        {renderChart()}
      </div>

      {showDetails && type === "multiBar" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {data.map((branch, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200"
            >
              <h4 className="font-semibold text-slate-800 mb-2">
                {branch._id[0]}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Accounts:</span>
                  <span className="font-medium">{branch.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Reserved:</span>
                  <span className="font-medium">
                    ৳{branch.reserevedBalance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Used:</span>
                  <span className="font-medium">৳{branch.usedBalance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Liquidity:</span>
                  <span
                    className={`font-medium ${
                      branch.liquidityRatio > 80
                        ? "text-red-600"
                        : branch.liquidityRatio > 60
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {branch.liquidityRatio?.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
