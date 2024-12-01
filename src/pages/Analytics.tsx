import { Header } from "@/components/layout/Header";
import { TradingViewWidget } from "@/components/dashboard/TradingViewWidget";

export default function Analytics() {
  return (
    <div className="h-screen">
      <Header />
      <div className="p-6">
        <TradingViewWidget />
      </div>
    </div>
  );
}