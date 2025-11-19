'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlockchainWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl">
      {isConnected ? (
        <>
          <CardHeader>
            <CardTitle>Connected Wallet</CardTitle>
            <CardDescription>Your blockchain wallet is connected.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Connected Address: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <Button variant="destructive" onClick={() => disconnect()}>
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
            <Button
              onClick={() => connect()}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}
