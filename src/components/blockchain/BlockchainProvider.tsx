import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/integrations/blockchain/client';

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  );
}