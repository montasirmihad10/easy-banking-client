/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarAreaChartProps {
  data: any[];
  title: string;
}

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 mx-auto h-[340px]">
      <PolarArea
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: !!title,
              text: title,
            },
            legend: {
              position: "right",
            },
          },
        }}
        data={{
          labels: data?.map((item) => `${item._id} Account-${item.count}`),
          datasets: [
            {
              label: "TotalBalance",
              data: data?.map((item) => item.totalBalance),
              backgroundColor: [
                "rgba(132, 234, 91, 0.6)",
                "#104042",
                "rgba(253, 108, 108, 0.6)",
                "rgba(70, 165, 255, 0.6)",
                "rgba(250, 207, 81, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default PolarAreaChart;
