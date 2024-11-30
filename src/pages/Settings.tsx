import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiKeyForm } from "@/components/settings/ApiKeyForm";

type Exchange = "kucoin" | "binance" | null;

const Settings = () => {
  const [selectedExchange, setSelectedExchange] = useState<Exchange>(null);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Sources de données</CardTitle>
              <CardDescription>
                Configurez vos sources de données pour suivre votre portefeuille
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
                <Button
                  variant={selectedExchange === "kucoin" ? "default" : "outline"}
                  onClick={() => setSelectedExchange("kucoin")}
                  className="h-auto py-6 flex flex-col gap-4"
                >
                  <img 
                    src="https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg" 
                    alt="KuCoin" 
                    className="h-12 w-12"
                  />
                  KuCoin
                </Button>
                <Button
                  variant={selectedExchange === "binance" ? "default" : "outline"}
                  onClick={() => setSelectedExchange("binance")}
                  className="h-auto py-6 flex flex-col gap-4"
                >
                  <img 
                    src="https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png" 
                    alt="Binance" 
                    className="h-12 w-12"
                  />
                  Binance
                </Button>
              </div>

              {selectedExchange && <ApiKeyForm exchange={selectedExchange} />}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;