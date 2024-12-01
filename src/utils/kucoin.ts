import { toast } from "@/components/ui/use-toast";

interface KucoinCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}

export const getKucoinCredentials = (): KucoinCredentials | null => {
  const credentials = localStorage.getItem('kucoin_credentials');
  return credentials ? JSON.parse(credentials) : null;
};

export const fetchKucoinBalance = async () => {
  const credentials = getKucoinCredentials();
  
  if (!credentials) {
    throw new Error("KuCoin credentials not found. Please configure them in settings.");
  }

  const timestamp = Date.now();
  const endpoint = '/api/v1/accounts';
  const proxyUrl = 'https://cors-proxy.fringe.zone'; // Using a CORS proxy
  const baseUrl = 'https://api.kucoin.com';

  // Create the signature (this is a simplified version, you'll need to implement proper signature generation)
  const signature = await createSignature(endpoint, 'GET', '', timestamp, credentials.apiSecret);

  try {
    const response = await fetch(`${proxyUrl}/${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'KC-API-KEY': credentials.apiKey,
        'KC-API-SIGN': signature,
        'KC-API-TIMESTAMP': timestamp.toString(),
        'KC-API-PASSPHRASE': credentials.passphrase,
        'KC-API-VERSION': '2',
        'Origin': window.location.origin,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch KuCoin data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast({
      title: "Error fetching KuCoin data",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive",
    });
    throw error;
  }
};

// Helper function to create signature (implement according to KuCoin documentation)
const createSignature = async (
  endpoint: string,
  method: string,
  body: string,
  timestamp: number,
  apiSecret: string
) => {
  const message = `${timestamp}${method}${endpoint}${body}`;
  
  // Use Web Crypto API for HMAC-SHA256
  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(apiSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};