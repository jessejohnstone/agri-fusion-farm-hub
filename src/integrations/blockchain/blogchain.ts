import { ethers } from 'ethers';

export const BLOGCHAIN_ABI = [
  'function registerPost(bytes32 hash) public returns (uint256)',
  'event PostRegistered(uint256 indexed id, bytes32 hash, address indexed owner)'
];

function toBytes32(hex: string) {
  if (hex.startsWith('0x')) return hex;
  return '0x' + hex;
}

export async function connectWallet(): Promise<string | null> {
  // Request account access through window.ethereum (MetaMask)
  if (!(window as any).ethereum) return null;
  await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  return await signer.getAddress();
}

export async function registerPostHash(hashHex: string, contractAddress?: string) {
  if (!contractAddress) contractAddress = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;
  if (!contractAddress) throw new Error('Smart contract address not configured');
  if (!(window as any).ethereum) throw new Error('No Ethereum provider available (MetaMask)');

  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, BLOGCHAIN_ABI, signer);

  const bytes32 = toBytes32(hashHex);
  const tx = await contract.registerPost(bytes32);
  const receipt = await tx.wait();
  return receipt;
}

// Utility: compute sha256 of UTF-8 string and return hex string
export async function sha256Hex(input: string) {
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default {
  connectWallet,
  registerPostHash,
  sha256Hex,
};
