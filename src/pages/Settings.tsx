import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApiKeyForm } from "@/components/settings/ApiKeyForm";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

const EXCHANGES = [
  {
    id: "kucoin",
    name: "KuCoin",
    logo: "https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg",
  },
  {
    id: "binance",
    name: "Binance",
    logo: "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png",
  },
];

const Settings = () => {
  const [selectedExchange, setSelectedExchange] = useState<"kucoin" | "binance" | null>(null);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full border-dashed">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a new source
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose an exchange</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {EXCHANGES.map((exchange) => (
                  <Dialog key={exchange.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center gap-2"
                        onClick={() => setSelectedExchange(exchange.id as "kucoin" | "binance")}
                      >
                        <img
                          src={exchange.logo}
                          alt={exchange.name}
                          className="h-16 w-16"
                        />
                        <span>{exchange.name}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect to {exchange.name}</DialogTitle>
                      </DialogHeader>
                      {selectedExchange && (
                        <ApiKeyForm exchange={selectedExchange} />
                      )}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Settings;