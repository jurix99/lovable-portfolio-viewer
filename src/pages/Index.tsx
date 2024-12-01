import { Coins, TrendingUp, Wallet } from "lucide-react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DashboardCard } from "../components/dashboard/DashboardCard";
import { PortfolioChart } from "../components/dashboard/PortfolioChart";
import { TokenDistribution } from "../components/dashboard/TokenDistribution";
import { TokenPerformance } from "../components/dashboard/TokenPerformance";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Total Balance"
              value="£3,126.00"
              change={{ value: "+£31.89", percentage: "1.02%", isPositive: true }}
              icon={<Wallet className="h-6 w-6 text-blue-500" />}
            />
            <DashboardCard
              title="24h Volume"
              value="£12,426.00"
              change={{ value: "-£142.32", percentage: "1.14%", isPositive: false }}
              icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
            />
            <DashboardCard
              title="Total Assets"
              value="12"
              change={{ value: "+2", percentage: "20%", isPositive: true }}
              icon={<Coins className="h-6 w-6 text-green-500" />}
            />
          </div>
          <div className="w-full">
            <PortfolioChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TokenPerformance />
            </div>
            <div>
              <TokenDistribution />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;