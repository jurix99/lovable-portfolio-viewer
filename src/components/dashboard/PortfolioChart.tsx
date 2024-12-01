import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowLeftRight, DollarSign, History, Download } from "lucide-react";

const dailyData = [
  { date: "Mon", value: 34200 },
  { date: "Tue", value: 34800 },
  { date: "Wed", value: 34300 },
  { date: "Thu", value: 34900 },
  { date: "Fri", value: 34600 },
  { date: "Sat", value: 34534 },
];

const weeklyData = [
  { date: "Mon", value: 33000 },
  { date: "Tue", value: 33500 },
  { date: "Wed", value: 34000 },
  { date: "Thu", value: 34200 },
  { date: "Fri", value: 34500 },
  { date: "Sat", value: 34534 },
];

const monthlyData = [
  { date: "Jan", value: 30000 },
  { date: "Feb", value: 31000 },
  { date: "Mar", value: 32000 },
  { date: "Apr", value: 33000 },
  { date: "May", value: 34000 },
  { date: "Jun", value: 34534 },
];

const yearlyData = [
  { date: "2023 Q1", value: 28000 },
  { date: "2023 Q2", value: 30000 },
  { date: "2023 Q3", value: 32000 },
  { date: "2023 Q4", value: 33500 },
  { date: "2024 Q1", value: 34534 },
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
    <div className="w-full h-[400px] glass rounded-3xl p-6 animate-fade-up">
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-300 bg-clip-text text-transparent">
            $34,534.24
          </h3>
          <span className="text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-1 rounded-full text-sm">
            +1.1%
          </span>
        </div>
        <p className="text-gray-400">Portfolio Value</p>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(244, 114, 182)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="rgb(244, 114, 182)" stopOpacity={0}/>
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
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.8)",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(244, 114, 182)"
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
          className="bg-[#1a1a1a] rounded-full p-1"
        >
          <ToggleGroupItem value="24H" className="data-[state=on]:bg-[#333] data-[state=on]:text-white px-4 py-2 rounded-full">24H</ToggleGroupItem>
          <ToggleGroupItem value="7D" className="data-[state=on]:bg-[#333] data-[state=on]:text-white px-4 py-2 rounded-full">7D</ToggleGroupItem>
          <ToggleGroupItem value="1M" className="data-[state=on]:bg-[#333] data-[state=on]:text-white px-4 py-2 rounded-full">1M</ToggleGroupItem>
          <ToggleGroupItem value="1Y" className="data-[state=on]:bg-[#333] data-[state=on]:text-white px-4 py-2 rounded-full">1Y</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex gap-2">
          <button className="p-3 bg-[#1a1a1a] rounded-full hover:bg-[#333] transition-colors">
            <DollarSign className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#1a1a1a] rounded-full hover:bg-[#333] transition-colors">
            <ArrowLeftRight className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#1a1a1a] rounded-full hover:bg-[#333] transition-colors">
            <History className="w-5 h-5" />
          </button>
          <button className="p-3 bg-[#1a1a1a] rounded-full hover:bg-[#333] transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};