import { ethers } from 'ethers';
import { createConfig, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Configure chains for testing on Mumbai testnet
const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

// Create wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

// Basic smart contract for agricultural products
export const AGRI_PRODUCT_ABI = [
  "event ProductRegistered(uint256 indexed id, string name, address owner)",
  "event ProductTransferred(uint256 indexed id, address from, address to)",
  "function registerProduct(string memory name) external returns (uint256)",
  "function transferProduct(uint256 id, address to) external",
  "function getProduct(uint256 id) external view returns (string memory name, address owner)"
];

// Blockchain utility functions
export class BlockchainService {
  private provider: ethers.Provider;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.VITE_POLYGON_MUMBAI_RPC || 'https://rpc-mumbai.maticvigil.com');
  }

  // Register a new agricultural product on the blockchain
  async registerProduct(name: string, contractAddress: string, signer: ethers.Signer) {
    const contract = new ethers.Contract(contractAddress, AGRI_PRODUCT_ABI, signer);
    const tx = await contract.registerProduct(name);
    return await tx.wait();
  }

  // Transfer product ownership
  async transferProduct(productId: number, toAddress: string, contractAddress: string, signer: ethers.Signer) {
    const contract = new ethers.Contract(contractAddress, AGRI_PRODUCT_ABI, signer);
    const tx = await contract.transferProduct(productId, toAddress);
    return await tx.wait();
  }

  // Get product details
  async getProduct(productId: number, contractAddress: string) {
    const contract = new ethers.Contract(contractAddress, AGRI_PRODUCT_ABI, this.provider);
    return await contract.getProduct(productId);
  }
}

export const blockchainService = new BlockchainService();