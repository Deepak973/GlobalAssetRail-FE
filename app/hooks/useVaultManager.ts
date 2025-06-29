import { useCallback, useEffect, useState } from "react";
import { Address, parseAbi } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "../config/wagmiConfig";

type Asset = {
  token: Address;
  navPerToken: bigint;
  haircutBP: bigint;
  active: boolean;
  totalDeposited: bigint;
};

type UseVaultManagerHook__Type = {
  assetList: Address[];
  getAssetData: (assetAddress: Address) => Promise<Asset | null>;
  fetchAssetList: () => Promise<void>;
  loading: boolean;
};

const vaultManagerAbi = parseAbi([
  "function getAssetList() external view returns (address[] memory)",
  "function assets(address) external view returns (address token, uint256 navPerToken, uint256 haircutBP, bool active, uint256 totalDeposited)",
]);

export const useVaultManager = ({
  vaultManagerAddress,
}: {
  vaultManagerAddress?: Address;
}): UseVaultManagerHook__Type => {
  const [assetList, setAssetList] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAssetList = useCallback(async () => {
    if (!vaultManagerAddress) return;

    setLoading(true);
    try {
      const assets = await readContract(config, {
        address: vaultManagerAddress,
        abi: vaultManagerAbi,
        functionName: "getAssetList",
      });
      console.log("assets", assets);

      setAssetList(assets as Address[]);
    } catch (error) {
      console.error("Error fetching asset list:", error);
      setAssetList([]);
    } finally {
      setLoading(false);
    }
  }, [vaultManagerAddress]);

  const getAssetData = useCallback(
    async (assetAddress: Address): Promise<Asset | null> => {
      if (!vaultManagerAddress) return null;

      try {
        const assetData = await readContract(config, {
          address: vaultManagerAddress,
          abi: vaultManagerAbi,
          functionName: "assets",
          args: [assetAddress],
        });

        return {
          token: assetData[0] as Address,
          navPerToken: assetData[1] as bigint,
          haircutBP: assetData[2] as bigint,
          active: assetData[3] as boolean,
          totalDeposited: assetData[4] as bigint,
        };
      } catch (error) {
        console.error("Error fetching asset data:", error);
        return null;
      }
    },
    [vaultManagerAddress]
  );

  useEffect(() => {
    fetchAssetList();
  }, [fetchAssetList]);

  return {
    assetList,
    getAssetData,
    fetchAssetList,
    loading,
  };
};
