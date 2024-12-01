import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const apiKeySchema = z.object({
  apiKey: z.string().min(1, "La clé API est requise"),
  apiSecret: z.string().min(1, "La clé secrète est requise"),
  passphrase: z.string().min(1, "La passphrase est requise"),
});

type ApiKeyFormProps = {
  exchange: "kucoin" | "binance";
  onSuccess?: () => void;
  onClose?: () => void;
};

export const ApiKeyForm = ({ exchange, onSuccess, onClose }: ApiKeyFormProps) => {
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
    console.log(values);
    toast({
      title: "Configuration sauvegardée",
      description: `Vos clés API ${exchange} ont été enregistrées avec succès.`,
    });
    form.reset();
    onSuccess?.();
    onClose?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clé API {exchange}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Entrez votre clé API" 
                    {...field} 
                    className="bg-transparent"
                  />
                </FormControl>
                <FormDescription>
                  Vous pouvez trouver votre clé API dans les paramètres de votre compte {exchange}
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
                    className="bg-transparent"
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
                    className="bg-transparent"
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
  );
};