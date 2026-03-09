// Blockchain service stub - no external dependencies required

export const AGRI_PRODUCT_ABI = [
  "event ProductRegistered(uint256 indexed id, string name, address owner)",
  "event ProductTransferred(uint256 indexed id, address from, address to)",
  "function registerProduct(string memory name) external returns (uint256)",
  "function transferProduct(uint256 id, address to) external",
  "function getProduct(uint256 id) external view returns (string memory name, address owner)"
];

export class BlockchainService {
  async registerProduct(name: string, contractAddress: string, signer: any) {
    console.log('Blockchain not configured:', name, contractAddress);
    throw new Error('Blockchain integration not configured');
  }

  async transferProduct(productId: number, toAddress: string, contractAddress: string, signer: any) {
    throw new Error('Blockchain integration not configured');
  }

  async getProduct(productId: number, contractAddress: string) {
    throw new Error('Blockchain integration not configured');
  }
}

export const blockchainService = new BlockchainService();
