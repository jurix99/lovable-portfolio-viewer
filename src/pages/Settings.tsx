import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiKeyForm } from "@/components/settings/ApiKeyForm";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <Card className="max-w-5xl">
            <CardHeader>
              <CardTitle>Sources de données</CardTitle>
              <CardDescription>
                Configurez vos sources de données pour suivre votre portefeuille
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <img 
                      src="https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg" 
                      alt="KuCoin" 
                      className="h-16 w-16"
                    />
                    <h3 className="text-lg font-semibold">KuCoin</h3>
                  </div>
                  <ApiKeyForm exchange="kucoin" />
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <img 
                      src="https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png" 
                      alt="Binance" 
                      className="h-16 w-16"
                    />
                    <h3 className="text-lg font-semibold">Binance</h3>
                  </div>
                  <ApiKeyForm exchange="binance" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;