import { useCallback, useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Address, WaitForTransactionReceiptReturnType, parseAbi } from "viem";
import { readContract, writeContract } from "@wagmi/core";
import { ChainConfig } from "../config/getChainConfig";
import { config } from "../config/wagmiConfig";
import { submitAction } from "../lib/utils/submitAction";

type UseStablecoinMintHook__Type = {
  balance: bigint;
  mintStablecoin: (amount: bigint) => Promise<void>;
  fetchBalance: () => Promise<void>;
  getStablecoinMetadata: () => Promise<{
    symbol: string;
    name: string;
    decimals: number;
  }>;
  loading: boolean;
  stablecoinAddress?: Address;
};

const STABLECOIN_ABI = parseAbi([
  "function mintForMerchant(uint256 amount) public",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
]);

export const useStablecoinMint = ({
  userAddress,
  onPrompt,
  onSubmitted,
  onSuccess,
  onError,
}: {
  userAddress?: Address;
  onPrompt?: () => void;
  onSubmitted?: (hash: `0x${string}`) => void;
  onSuccess?: (receipt: WaitForTransactionReceiptReturnType) => void;
  onError?: (err: unknown) => void;
}): UseStablecoinMintHook__Type => {
  const { address } = useAccount();
  const chainId = useChainId();
  const [balance, setBalance] = useState<bigint>(BigInt(0));
  const [loading, setLoading] = useState<boolean>(false);

  // Get stablecoin address from chain config
  const stablecoinAddress = chainId
    ? ChainConfig[chainId]?.SINR_STABLE_COIN
    : undefined;

  const mintStablecoin = useCallback(
    async (amount: bigint) => {
      if (!address || !stablecoinAddress) {
        throw new Error("Wallet not connected or stablecoin not available");
      }

      await submitAction(
        async () => {
          return await writeContract(config, {
            address: stablecoinAddress,
            abi: STABLECOIN_ABI,
            functionName: "mintForMerchant",
            args: [amount],
          });
        },
        {
          onPrompt: () => {
            setLoading(true);
            if (onPrompt) onPrompt();
          },
          onSubmitted,
          onSuccess: async (receipt: WaitForTransactionReceiptReturnType) => {
            setLoading(false);
            await fetchBalance();
            if (onSuccess) onSuccess(receipt);
          },
          onError: (err: unknown) => {
            setLoading(false);
            if (onError) onError(err);
          },
        }
      );
    },
    [address, stablecoinAddress, onPrompt, onSubmitted, onSuccess, onError]
  );

  const fetchBalance = useCallback(async () => {
    if (!stablecoinAddress) return;
    if (!userAddress) return;

    try {
      const data = await readContract(config, {
        address: stablecoinAddress,
        abi: STABLECOIN_ABI,
        functionName: "balanceOf",
        args: [userAddress],
      });

      setBalance(data as bigint);
    } catch (error) {
      console.error("Error fetching stablecoin balance:", error);
      setBalance(BigInt(0));
    }
  }, [stablecoinAddress, userAddress]);

  const getStablecoinMetadata = useCallback(async () => {
    if (!stablecoinAddress) throw new Error("Stablecoin address is required");

    try {
      const [symbol, name, decimals] = await Promise.all([
        readContract(config, {
          address: stablecoinAddress,
          abi: STABLECOIN_ABI,
          functionName: "symbol",
        }),
        readContract(config, {
          address: stablecoinAddress,
          abi: STABLECOIN_ABI,
          functionName: "name",
        }),
        readContract(config, {
          address: stablecoinAddress,
          abi: STABLECOIN_ABI,
          functionName: "decimals",
        }),
      ]);

      return {
        symbol: symbol as string,
        name: name as string,
        decimals: decimals as number,
      };
    } catch (error) {
      console.error("Error fetching stablecoin metadata:", error);
      throw error;
    }
  }, [stablecoinAddress]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    mintStablecoin,
    fetchBalance,
    getStablecoinMetadata,
    loading,
    stablecoinAddress,
  };
};
