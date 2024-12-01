import { Card } from "@/components/ui/card";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { TokenDistribution } from "@/components/dashboard/TokenDistribution";
import { TokenPerformance } from "@/components/dashboard/TokenPerformance";
import { Header } from "@/components/layout/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchKucoinBalance } from "@/utils/kucoin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getKucoinCredentials } from "@/utils/kucoin";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Index() {
  const navigate = useNavigate();

  const { data: balanceData, isLoading, error } = useQuery({
    queryKey: ['kucoinBalance'],
    queryFn: fetchKucoinBalance,
    enabled: !!getKucoinCredentials(),
  });

  useEffect(() => {
    const credentials = getKucoinCredentials();
    if (!credentials) {
      toast({
        title: "KuCoin API not configured",
        description: "Please configure your KuCoin API keys in the settings page",
        action: <ToastAction altText="Go to Settings" onClick={() => navigate("/settings")}>
          Go to Settings
        </ToastAction>,
      });
    }
  }, [navigate]);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <h2 className="font-semibold">Total Balance</h2>
            {isLoading ? (
              <p className="text-2xl font-bold animate-pulse">Loading...</p>
            ) : error ? (
              <p className="text-2xl font-bold text-red-500">Error loading data</p>
            ) : (
              <p className="text-2xl font-bold">${balanceData?.totalBalance || '0.00'}</p>
            )}
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
          <h2 className="mb-4 font-semibold">Token Performance</h2>
          <TokenPerformance />
        </Card>
      </div>
    </div>
  );
}