import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { date: "Jan", value: 3000 },
  { date: "Feb", value: 3200 },
  { date: "Mar", value: 2800 },
  { date: "Apr", value: 3400 },
  { date: "May", value: 3100 },
  { date: "Jun", value: 3500 },
];

export const PortfolioChart = () => {
  return (
    <div className="w-full h-[300px] glass rounded-2xl p-6 animate-fade-up">
      <h3 className="text-xl font-bold mb-6">Portfolio Value</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
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