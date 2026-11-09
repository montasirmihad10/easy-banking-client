/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: any[];
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 mx-auto h-[340px]">
      <Doughnut
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
          labels: data?.map(
            (item) =>
              `${
                item._id ? item._id : item.accountType ? item.accountType : ""
              } Loan-${item.count}`
          ),
          datasets: [
            {
              label: "TotalBalance",
              data: data?.map((item) =>
                item.totalBalance
                  ? item.totalBalance
                  : item.totalLoanAmount
                  ? item.totalLoanAmount
                  : item.balance
                  ? item.balance
                  : 0
              ),
              backgroundColor: [
                "#104042",
                "rgba(253, 108, 108)",
                "rgba(132, 234, 91)",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
