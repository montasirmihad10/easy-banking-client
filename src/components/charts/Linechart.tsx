// /* eslint-disable @typescript-eslint/no-explicit-any */
// import type React from "react";
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface LineChartProps {
//   data: any[];
//   title: string;
//   color?: string;
//   compact?: boolean;
// }

// const LineChart: React.FC<LineChartProps> = ({
//   data,
//   title,
//   color = "#dc2626",
//   compact = false,
// }) => {
//   const chartData = data.map((item) => ({
//     date: new Date(item._id || item.date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     }),
//     value: item.count || item.amount || 0,
//   }));

//   return (
//     <div className={`bg-white rounded-lg shadow-sm ${compact ? "p-4" : "p-6"}`}>
//       <h3
//         className={`${
//           compact ? "text-sm" : "text-lg"
//         } font-semibold text-gray-800 mb-4`}
//       >
//         {title}
//       </h3>
//       <div className={compact ? "h-48" : "h-64"}>
//         <ResponsiveContainer width="100%" height="100%">
//           <RechartsLineChart
//             data={chartData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" fontSize={compact ? 10 : 12} />
//             <YAxis fontSize={compact ? 10 : 12} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke={color}
//               strokeWidth={2}
//               dot={{ fill: color, strokeWidth: 2, r: 4 }}
//             />
//           </RechartsLineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default LineChart;

/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LineChart.tsx
import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

// Register Chart.js components for Line Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: any;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl w-full h-[340px]">
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: !!title,
              text: title,
            },
          },
        }}
        data={{
          labels: data?.map((item: any) => {
            const day = item._id.day ? item._id?.day : "";
            const type = item._id?.type ?? "";
            return item._id.day
              ? `${dayjs()
                  .subtract(30 - day, "day")
                  .format("MMM D")} ${type}`
              : item.date
              ? dayjs(item.date).format("MMM D")
              : "";
          }),
          datasets: [
            {
              label: "TotalAmount",
              data: data?.map((item: any) =>
                item.totalAmount
                  ? item.totalAmount
                  : item.totalLoanAmount
                  ? item.totalLoanAmount
                  : item.dailyAmount
                  ? item.dailyAmount
                  : item.count ? item.count :''
              ),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
