import type React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string
  value: number | string
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  growth?: number;
  trend?: "up" | "down";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradient,
  growth,
  trend,
}) => {
  return (
    <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
      />
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
          >
            {icon}
          </div>
          {growth !== undefined && (
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend === "up"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(growth)}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
