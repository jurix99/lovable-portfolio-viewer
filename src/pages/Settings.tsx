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
              <div className="flex gap-4 mb-8">
                <Button
                  variant={selectedExchange === "kucoin" ? "default" : "outline"}
                  onClick={() => setSelectedExchange("kucoin")}
                >
                  KuCoin
                </Button>
                <Button
                  variant={selectedExchange === "binance" ? "default" : "outline"}
                  onClick={() => setSelectedExchange("binance")}
                >
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