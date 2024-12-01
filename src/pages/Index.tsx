import { Card } from "@/components/ui/card";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { TokenDistribution } from "@/components/dashboard/TokenDistribution";
import { TokenPerformance } from "@/components/dashboard/TokenPerformance";
import { TradingViewWidget } from "@/components/dashboard/TradingViewWidget";

export default function Index() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <h2 className="font-semibold">Total Balance</h2>
          <p className="text-2xl font-bold">$12,345.67</p>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">24h Change</h2>
          <p className="text-2xl font-bold text-green-500">+5.67%</p>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Total Profit</h2>
          <p className="text-2xl font-bold text-green-500">+$1,234.56</p>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Active Positions</h2>
          <p className="text-2xl font-bold">8</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-4 font-semibold">Portfolio Overview</h2>
          <PortfolioChart />
        </Card>
        <Card className="p-4">
          <h2 className="mb-4 font-semibold">Token Distribution</h2>
          <TokenDistribution />
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="mb-4 font-semibold">TradingView Chart</h2>
        <TradingViewWidget />
      </Card>

      <Card className="p-4">
        <h2 className="mb-4 font-semibold">Token Performance</h2>
        <TokenPerformance />
      </Card>
    </div>
  );
}