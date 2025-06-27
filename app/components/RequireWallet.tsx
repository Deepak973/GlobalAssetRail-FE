"use client";

import { useAccount } from "wagmi";

export function RequireWallet({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center max-w-md w-full mx-4 p-8 rounded-lg bg-white shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access this page
            </p>
            <div className="flex justify-center">
              <w3m-button />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
