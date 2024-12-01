import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowLeftRight, DollarSign, Download, History } from "lucide-react";

const dailyData = [
  { date: "09:00", value: 64200 },
  { date: "12:00", value: 64500 },
  { date: "15:00", value: 64300 },
  { date: "18:00", value: 64800 },
  { date: "21:00", value: 64600 },
  { date: "00:00", value: 64792 },
];

const weeklyData = [
  { date: "Lun", value: 63000 },
  { date: "Mar", value: 63500 },
  { date: "Mer", value: 64000 },
  { date: "Jeu", value: 64200 },
  { date: "Ven", value: 64500 },
  { date: "Sam", value: 64600 },
  { date: "Dim", value: 64792 },
];

const monthlyData = [
  { date: "Jan", value: 60000 },
  { date: "Fév", value: 61000 },
  { date: "Mar", value: 62000 },
  { date: "Avr", value: 63000 },
  { date: "Mai", value: 64000 },
  { date: "Juin", value: 64792 },
];

const yearlyData = [
  { date: "2023 T1", value: 58000 },
  { date: "2023 T2", value: 60000 },
  { date: "2023 T3", value: 62000 },
  { date: "2023 T4", value: 63500 },
  { date: "2024 T1", value: 64792 },
];

type Period = "24H" | "7D" | "1M" | "1Y";

export const PortfolioChart = () => {
  const [period, setPeriod] = useState<Period>("24H");

  const getData = () => {
    switch (period) {
      case "24H":
        return dailyData;
      case "7D":
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
    <div className="w-full h-[400px] glass rounded-2xl p-6 animate-fade-up">
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-white">$64,792.59</h3>
          <span className="text-green-500">+1.32%</span>
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3b9a" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ff3b9a" stopOpacity={0}/>
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
              stroke="#ff3b9a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-6">
        <ToggleGroup 
          type="single" 
          value={period} 
          onValueChange={(value) => value && setPeriod(value as Period)}
          className="bg-[#2a2a3c] rounded-full p-1"
        >
          <ToggleGroupItem value="24H" className="data-[state=on]:bg-[#6366f1] data-[state=on]:text-white px-4 py-2 rounded-full">24H</ToggleGroupItem>
          <ToggleGroupItem value="7D" className="data-[state=on]:bg-[#6366f1] data-[state=on]:text-white px-4 py-2 rounded-full">7D</ToggleGroupItem>
          <ToggleGroupItem value="1M" className="data-[state=on]:bg-[#6366f1] data-[state=on]:text-white px-4 py-2 rounded-full">1M</ToggleGroupItem>
          <ToggleGroupItem value="1Y" className="data-[state=on]:bg-[#6366f1] data-[state=on]:text-white px-4 py-2 rounded-full">1Y</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex gap-2">
          <button className="p-3 bg-[#2a2a3c] rounded-full hover:bg-[#3a3a4c] transition-colors">
            <DollarSign className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#2a2a3c] rounded-full hover:bg-[#3a3a4c] transition-colors">
            <ArrowLeftRight className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#2a2a3c] rounded-full hover:bg-[#3a3a4c] transition-colors">
            <History className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#2a2a3c] rounded-full hover:bg-[#3a3a4c] transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};