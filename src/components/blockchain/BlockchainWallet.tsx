import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { connectWallet } from '@/integrations/blockchain/blogchain';

export default function BlockchainWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const addr = await connectWallet();
      setAddress(addr);
    } catch (e) {
      console.error('Wallet connection failed:', e);
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl">
      {address ? (
        <>
          <CardHeader>
            <CardTitle>Connected Wallet</CardTitle>
            <CardDescription>Your blockchain wallet is connected.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connected Address: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <Button variant="destructive" onClick={() => setAddress(null)}>
              Disconnect Wallet
            </Button>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Connect your blockchain wallet to enable traceability features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleConnect} disabled={loading} className="w-full">
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}
