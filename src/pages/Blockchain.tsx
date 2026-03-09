import { useState } from 'react';
import BlockchainWallet from '@/components/blockchain/BlockchainWallet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blockchainService } from '@/integrations/blockchain/client';
import { useToast } from '@/components/ui/use-toast';

export default function Blockchain() {
  const { toast } = useToast();
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterProduct = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const contractAddress = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;
      await blockchainService.registerProduct(productName, contractAddress, null);
      toast({ title: "Success", description: "Product registered on blockchain" });
      setProductName('');
    } catch (error) {
      toast({ title: "Error", description: "Failed to register product", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blockchain Integration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlockchainWallet />
        <Card>
          <CardHeader>
            <CardTitle>Register Agricultural Product</CardTitle>
            <CardDescription>Register products on the blockchain for traceability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
              <Button onClick={handleRegisterProduct} disabled={loading || !productName}>
                {loading ? 'Registering...' : 'Register Product'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
