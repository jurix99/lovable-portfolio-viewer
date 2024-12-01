import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
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
        <h3 className="text-xl font-bold">Portfolio Value</h3>
        <ToggleGroup type="single" value={period} onValueChange={(value) => value && setPeriod(value as Period)}>
          <ToggleGroupItem value="1D">1D</ToggleGroupItem>
          <ToggleGroupItem value="1W">1W</ToggleGroupItem>
          <ToggleGroupItem value="1M">1M</ToggleGroupItem>
          <ToggleGroupItem value="1Y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={getData()}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#666" />
          <Tooltip
            contentStyle={{
              background: "rgba(13, 17, 28, 0.9)",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};