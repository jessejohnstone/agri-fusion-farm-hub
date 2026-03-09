// BlogChain stub - no external dependencies required

export async function connectWallet(): Promise<string | null> {
  if (!(window as any).ethereum) return null;
  await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
  return accounts[0] || null;
}

export async function registerPostHash(hashHex: string, contractAddress?: string) {
  throw new Error('Blockchain integration not configured');
}

export async function sha256Hex(input: string) {
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default { connectWallet, registerPostHash, sha256Hex };
