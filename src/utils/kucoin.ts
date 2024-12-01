interface KucoinCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}

export const getKucoinCredentials = (): KucoinCredentials | null => {
  const credentials = localStorage.getItem('kucoin_credentials');
  return credentials ? JSON.parse(credentials) : null;
};

const createSignature = async (apiSecret: string, timestamp: string, method: string, endpoint: string, body: string = '') => {
  const message = `${timestamp}${method}${endpoint}${body}`;
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

const createPassphraseSignature = async (apiSecret: string, passphrase: string) => {
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
    encoder.encode(passphrase)
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};

export const fetchKucoinBalance = async () => {
  const credentials = getKucoinCredentials();
  
  if (!credentials) {
    throw new Error("KuCoin credentials not found. Please configure them in settings.");
  }

  const timestamp = Date.now().toString();
  const endpoint = '/api/v1/accounts';
  const method = 'GET';
  const baseUrl = 'https://api.kucoin.com';

  const signature = await createSignature(
    credentials.apiSecret,
    timestamp,
    method,
    endpoint
  );

  const passphrase = await createPassphraseSignature(
    credentials.apiSecret,
    credentials.passphrase
  );

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'KC-API-KEY': credentials.apiKey,
        'KC-API-SIGN': signature,
        'KC-API-TIMESTAMP': timestamp,
        'KC-API-PASSPHRASE': passphrase,
        'KC-API-KEY-VERSION': '2',
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`KuCoin API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const accounts = data.data || [];
    
    const totalBalance = accounts
      .filter((account: any) => parseFloat(account.balance) > 0)
      .reduce((sum: number, account: any) => sum + parseFloat(account.balance), 0);

    return {
      totalBalance: totalBalance.toFixed(2),
      accounts: accounts
    };
  } catch (error) {
    console.error('Error fetching KuCoin data:', error);
    throw error;
  }
};