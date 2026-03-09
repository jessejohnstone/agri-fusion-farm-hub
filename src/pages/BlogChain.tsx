import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import blogchain, { sha256Hex } from '@/integrations/blockchain/blogchain';
import { useToast } from '@/components/ui/use-toast';

export default function BlogChainPage() {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnchor = async () => {
    if (!title && !content) {
      toast({ title: 'Provide title or content', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const payload = JSON.stringify({ title, content, timestamp: new Date().toISOString() });
      const hash = await sha256Hex(payload);

      // Try to connect wallet first (user-friendly)
      const addr = await blogchain.connectWallet();
      if (!addr) throw new Error('Wallet connection required');

      // Register post hash on-chain (requires deployed contract)
      await blogchain.registerPostHash(hash);

      toast({ title: 'Anchored', description: 'Post hash registered successfully' });
      setTitle('');
      setContent('');
    } catch (err: any) {
      toast({ title: 'Error', description: (err && err.message) || String(err), variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BlogChain — Anchor Posts On-Chain</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Anchor a Post</CardTitle>
            <CardDescription>Add a title and content to anchor its hash on-chain for proof of authorship.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Title" value={title} onChange={(e) => setTitle((e.target as HTMLInputElement).value)} />
              <textarea className="w-full p-2 border rounded" rows={8} placeholder="Post content" value={content} onChange={(e) => setContent((e.target as HTMLTextAreaElement).value)} />
              <div className="flex gap-2">
                <Button onClick={handleAnchor} disabled={loading}>{loading ? 'Anchoring...' : 'Anchor Post'}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page computes a SHA-256 hash of your post payload and submits the hash to a blockchain registry contract.
              You need a wallet (MetaMask) and the registry contract deployed. Configure the address as `VITE_SMART_CONTRACT_ADDRESS`.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
