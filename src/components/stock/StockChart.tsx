import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { format } from "date-fns";
import type { StockData } from "@/types/stock";

interface StockChartProps {
  data: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Sort data by date
  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) =>
        new Date(a.ex_dividend_date).getTime() -
        new Date(b.ex_dividend_date).getTime()
    );
  }, [data]);

  if (data.length === 0) return null;

  // Format date for display
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM dd, yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Dividend History
        </h3>
        <p className="text-sm text-gray-500">Cash amount payouts over time</p>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="ex_dividend_date"
              tickFormatter={(value) => {
                try {
                  return format(new Date(value), "yyyy");
                } catch {
                  return value;
                }
              }}
              minTickGap={30}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as StockData;
                  return (
                    <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                      <p className="text-sm font-semibold text-gray-800 mb-1">
                        {formatDate(label)}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">Amount:</span>
                        <span className="text-sm font-bold text-gray-900">
                          {item.cash_amount} {item.currency}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        {item.ticker}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="cash_amount" radius={[4, 4, 0, 0]}>
              {sortedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
              ))}
            </Bar>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
