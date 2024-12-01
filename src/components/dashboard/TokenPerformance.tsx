import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface TokenData {
  name: string;
  symbol: string;
  logo: string;
  currentPrice: number;
  purchasePrice: number;
  performance: {
    day: number;
    week: number;
    month: number;
    year: number;
  };
}

const tokens: TokenData[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    currentPrice: 52000,
    purchasePrice: 45000,
    performance: {
      day: 2.5,
      week: 5.8,
      month: 15.2,
      year: 45.7,
    },
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    currentPrice: 2800,
    purchasePrice: 2200,
    performance: {
      day: -1.2,
      week: 3.4,
      month: 12.8,
      year: 38.2,
    },
  },
  {
    name: "USDT",
    symbol: "USDT",
    logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    currentPrice: 1.00,
    purchasePrice: 1.00,
    performance: {
      day: 0.01,
      week: -0.02,
      month: 0.05,
      year: 0.1,
    },
  },
];

export const TokenPerformance = () => {
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const calculateProfit = (current: number, purchase: number) => {
    return current - purchase;
  };

  return (
    <div className="w-full glass rounded-2xl p-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#1890ff] bg-opacity-20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-[#1890ff]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Token Performance</h3>
          <p className="text-gray-400 text-sm">Profit/Loss Analysis</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow>
              <TableHead className="text-gray-400">Asset</TableHead>
              <TableHead className="text-gray-400">Current Price</TableHead>
              <TableHead className="text-gray-400">Purchase Price</TableHead>
              <TableHead className="text-gray-400">Profit/Loss</TableHead>
              <TableHead className="text-gray-400">24h</TableHead>
              <TableHead className="text-gray-400">7d</TableHead>
              <TableHead className="text-gray-400">30d</TableHead>
              <TableHead className="text-gray-400">1y</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => {
              const profit = calculateProfit(token.currentPrice, token.purchasePrice);
              const profitPercentage = (profit / token.purchasePrice) * 100;

              return (
                <TableRow key={token.symbol} className="border-b border-[rgba(255,255,255,0.1)]">
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img src={token.logo} alt={token.name} className="h-full w-full object-cover" />
                      </Avatar>
                      <div>
                        <div>{token.name}</div>
                        <div className="text-sm text-gray-400">{token.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {formatPrice(token.currentPrice)}
                  </TableCell>
                  <TableCell className="text-white">
                    {formatPrice(token.purchasePrice)}
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {profit >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{formatPrice(profit)}</span>
                      <span>({formatPercentage(profitPercentage)})</span>
                    </div>
                  </TableCell>
                  <TableCell className={token.performance.day >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatPercentage(token.performance.day)}
                  </TableCell>
                  <TableCell className={token.performance.week >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatPercentage(token.performance.week)}
                  </TableCell>
                  <TableCell className={token.performance.month >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatPercentage(token.performance.month)}
                  </TableCell>
                  <TableCell className={token.performance.year >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatPercentage(token.performance.year)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};