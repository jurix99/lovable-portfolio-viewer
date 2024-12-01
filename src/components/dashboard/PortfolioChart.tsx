import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const dailyData = [
  { date: "09:00", value: 3000 },
  { date: "12:00", value: 3200 },
  { date: "15:00", value: 2800 },
  { date: "18:00", value: 3400 },
  { date: "21:00", value: 3100 },
  { date: "00:00", value: 3500 },
];

const weeklyData = [
  { date: "Lun", value: 3000 },
  { date: "Mar", value: 3200 },
  { date: "Mer", value: 2800 },
  { date: "Jeu", value: 3400 },
  { date: "Ven", value: 3100 },
  { date: "Sam", value: 3500 },
  { date: "Dim", value: 3800 },
];

const monthlyData = [
  { date: "Jan", value: 3000 },
  { date: "Fév", value: 3200 },
  { date: "Mar", value: 2800 },
  { date: "Avr", value: 3400 },
  { date: "Mai", value: 3100 },
  { date: "Juin", value: 3500 },
];

const yearlyData = [
  { date: "2023 T1", value: 3000 },
  { date: "2023 T2", value: 3200 },
  { date: "2023 T3", value: 2800 },
  { date: "2023 T4", value: 3400 },
  { date: "2024 T1", value: 3100 },
];

type Period = "1D" | "1W" | "1M" | "1Y";

export const PortfolioChart = () => {
  const [period, setPeriod] = useState<Period>("1D");

  const getData = () => {
    switch (period) {
      case "1D":
        return dailyData;
      case "1W":
        return weeklyData;
      case "1M":
        return monthlyData;
      case "1Y":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  return (
    <div className="w-full h-[300px] glass rounded-2xl p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1890ff] bg-opacity-20 flex items-center justify-center">
            <span className="text-[#1890ff] font-semibold">$</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Portfolio Value</h3>
            <p className="text-gray-400 text-sm">USD/EUR</p>
          </div>
        </div>
        <ToggleGroup 
          type="single" 
          value={period} 
          onValueChange={(value) => value && setPeriod(value as Period)}
          className="bg-black/40 rounded-xl p-1"
        >
          <ToggleGroupItem value="1D" className="data-[state=on]:bg-[#1890ff] data-[state=on]:text-white px-3 py-1">1D</ToggleGroupItem>
          <ToggleGroupItem value="1W" className="data-[state=on]:bg-[#1890ff] data-[state=on]:text-white px-3 py-1">1W</ToggleGroupItem>
          <ToggleGroupItem value="1M" className="data-[state=on]:bg-[#1890ff] data-[state=on]:text-white px-3 py-1">1M</ToggleGroupItem>
          <ToggleGroupItem value="1Y" className="data-[state=on]:bg-[#1890ff] data-[state=on]:text-white px-3 py-1">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={getData()}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#666" 
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0, 0, 0, 0.8)",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
            itemStyle={{
              color: "#fff"
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1890ff"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};