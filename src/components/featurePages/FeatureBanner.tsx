"use client";
import { motion } from "framer-motion";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart3, TrendingUp } from "lucide-react";

const lineData = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 1398 },
  { month: "Mar", value: 9800 },
  { month: "Apr", value: 3908 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 3800 },
];
const barData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#104042",
  },
};

const BankingFeaturesBanner = () => {
  return (
    <div className="mt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ backgroundColor: "#104042" }}
          >
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Analytics &{" "}
            <span style={{ color: "#104042" }}>Chart Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get powerful visual insights with our comprehensive charting tools.
            Track your financial data with interactive charts and real-time
            analytics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" style={{ color: "#104042" }} />
              <h3 className="text-xl font-semibold">
                Real-time Data Visualization
              </h3>
            </div>
            <p className="text-gray-600">
              Transform your financial data into beautiful, interactive charts.
              Our platform provides line charts, bar charts, and advanced
              analytics to help you make informed decisions.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#104042" }}
                ></div>
                Interactive line and bar charts
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#104042" }}
                ></div>
                Real-time data updates
              </li>
              <li className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#104042" }}
                ></div>
                Customizable chart themes
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="p-4 border rounded-lg w-full">
              <h4 className="text-sm font-medium mb-3 text-gray-700">
                Sample Line Chart
              </h4>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <LineChart data={lineData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="value"
                    type="monotone"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>

            <div className="p-4 border rounded-lg w-full">
              <h4 className="text-sm font-medium mb-3 text-gray-700">
                Sample Bar Chart
              </h4>
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <BarChart data={barData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="value"
                    fill="var(--color-value)"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BankingFeaturesBanner;
