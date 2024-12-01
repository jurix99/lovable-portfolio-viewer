import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface TokenShare {
  name: string;
  percentage: number;
  color: string;
}

const TOKENS: TokenShare[] = [
  { name: "Bitcoin", percentage: 45, color: "#F7931A" },
  { name: "Ethereum", percentage: 30, color: "#627EEA" },
  { name: "USDT", percentage: 25, color: "#26A17B" },
];

export const TokenDistribution = () => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="w-full glass rounded-2xl p-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#1890ff] bg-opacity-20 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-[#1890ff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Token Distribution</h3>
          <p className="text-gray-400 text-sm">Portfolio Allocation</p>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {TOKENS.map((token, index) => {
              const percentage = token.percentage;
              const strokeDasharray = (circumference * percentage) / 100;
              const strokeDashoffset = offset;
              offset += strokeDasharray;

              return (
                <circle
                  key={token.name}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={token.color}
                  strokeWidth="24"
                  strokeDasharray={`${strokeDasharray} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-in-out"
                  transform="rotate(-90 100 100)"
                />
              );
            })}
            <text
              x="100"
              y="90"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold fill-white"
            >
              {TOKENS[0].percentage}%
            </text>
            <text
              x="100"
              y="115"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm fill-gray-400"
            >
              {TOKENS[0].name}
            </text>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {TOKENS.map((token) => (
          <div
            key={token.name}
            className="flex flex-col items-center p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors"
          >
            <div
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: token.color }}
            />
            <span className="text-white font-medium">{token.percentage}%</span>
            <span className="text-gray-400 text-xs">{token.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};