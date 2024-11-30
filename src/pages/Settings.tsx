import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const apiKeySchema = z.object({
  apiKey: z.string().min(1, "La clé API est requise"),
  apiSecret: z.string().min(1, "La clé secrète est requise"),
  passphrase: z.string().min(1, "La passphrase est requise"),
});

const Settings = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof apiKeySchema>>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: "",
      apiSecret: "",
      passphrase: "",
    },
  });

  const onSubmit = (values: z.infer<typeof apiKeySchema>) => {
    // TODO: Sauvegarder les clés API de manière sécurisée
    console.log(values);
    toast({
      title: "Configuration sauvegardée",
      description: "Vos clés API Kucoin ont été enregistrées avec succès.",
    });
    form.reset();
  };

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clé API Kucoin</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez votre clé API"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Vous pouvez trouver votre clé API dans les paramètres
                            de votre compte Kucoin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="apiSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clé secrète</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Entrez votre clé secrète"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passphrase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passphrase</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Entrez votre passphrase"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Sauvegarder</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;