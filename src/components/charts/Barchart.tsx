/* eslint-disable @typescript-eslint/no-explicit-any */
// components/BarChart.tsx
import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: any;
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl w-full h-[340px]">
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false, // 👈 important for filling height
          plugins: {
            title: {
              display: !!title,
              text: title,
            },
          },
        }}
        data={{
          labels: data?.map((item: any) => `${item._id}-${item.count}`),
          datasets: [
            {
              label: "TotalAmount",
              data: data?.map(
                (item: any) =>
                  `${
                    item.totalAmount
                      ? item.totalAmount
                      : item.totalLoanAmount
                      ? item.totalLoanAmount
                      : item.reserevedBalance
                      ? item.reserevedBalance
                      : ""
                  }`
              ),
              backgroundColor: [
                "#104042",
                "rgba(253, 108, 108)",
                "rgba(132, 234, 91)",
                "rgba(70, 165, 255)",
                "rgba(250, 207, 81)",
              ],
              borderRadius: 5,
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
