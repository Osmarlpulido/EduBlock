// Declaraciones de tipos globales para TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
    ethers?: {
      BrowserProvider: new (provider: any) => any;
      Contract: new (address: string, abi: any[], signer: any) => any;
    };
  }
}

export {};
