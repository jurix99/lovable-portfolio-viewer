import { PlusCircle, Pencil } from "lucide-react";
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
  const [configuredSources, setConfiguredSources] = useState<Array<{id: string, name: string, logo: string}>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSaveConfiguration = (exchange: typeof EXCHANGES[0]) => {
    if (!configuredSources.find(source => source.id === exchange.id)) {
      setConfiguredSources([...configuredSources, exchange]);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6 space-y-6">
          {/* Configured Sources */}
          {configuredSources.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Configured Sources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {configuredSources.map((source) => (
                  <Dialog 
                    key={source.id}
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-20 flex items-center justify-between px-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={source.logo}
                            alt={source.name}
                            className="h-10 w-10"
                          />
                          <span>{source.name}</span>
                        </div>
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit {source.name} Configuration</DialogTitle>
                      </DialogHeader>
                      <ApiKeyForm 
                        exchange={source.id as "kucoin" | "binance"} 
                        onClose={() => setIsEditDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}

          {/* Add New Source Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                        <ApiKeyForm 
                          exchange={selectedExchange} 
                          onSuccess={() => handleSaveConfiguration(exchange)}
                          onClose={() => setIsDialogOpen(false)}
                        />
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