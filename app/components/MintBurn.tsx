import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import {
  Coins,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertCircle,
  CheckCircle,
  Wallet,
  Building2,
  TrendingUp,
  Globe,
} from "lucide-react";

import { useAccount, useChainId } from "wagmi";
import { Address, parseAbi } from "viem";
import { readContract } from "@wagmi/core";
import { useVaultManager } from "../hooks/useVaultManager";
import { ChainConfig } from "../config/getChainConfig";
import { config } from "../config/wagmiConfig";
import { useStablecoinMint } from "../hooks/useStablecoinMint";
import {
  AlertsContext,
  Alert_Kind__Enum_Type,
} from "@/app/providers/AllertProvider";
import { useTokenApprove } from "../hooks/useToken";

interface Asset {
  name: string;
  tier: number;
  haircutBP: number;
  country: string;
  decimals: number;
  yieldRate: number;
  address?: Address;
  symbol: string;
  description?: string;
  availableSupply?: string;
  marketCap?: string;
}

interface AssetData {
  [key: string]: Asset;
}

interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
}

interface DematHolding {
  assetSymbol: string;
  assetName: string;
  quantity: number;
  valueInINR: number;
  lastUpdated: Date;
  status: string;
}

interface UserDematData {
  userAddress: string;
  dematAccountNumber: string;
  holdings: DematHolding[];
  totalValue: number;
}

interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
  description: string;
  totalAssets: number;
  totalMarketCap: string;
}

const MintBurn = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { showAlert } = useContext(AlertsContext);

  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [erc20Amount, setErc20Amount] = useState("");
  const [selectedStablecoin, setSelectedStablecoin] = useState("");
  const [stablecoinAmount, setStablecoinAmount] = useState("");
  const [offChainAssets, setOffChainAssets] = useState<AssetData>({});
  const [erc20Assets, setErc20Assets] = useState<AssetData>({});
  const [tokenMetadata, setTokenMetadata] = useState<{
    [key: string]: TokenMetadata;
  }>({});
  const [userBalances, setUserBalances] = useState<{ [key: string]: number }>(
    {}
  );
  const [erc20Balances, setErc20Balances] = useState<{ [key: string]: number }>(
    {}
  );
  const [stablecoinBalances, setStablecoinBalances] = useState<{
    [key: string]: number;
  }>({
    sINR: 0,
    sYEN: 0,
    sEUR: 0,
    sGBP: 0,
  });
  const [userDematData, setUserDematData] = useState<UserDematData | null>(
    null
  );
  const [loadingDemat, setLoadingDemat] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  // Get VaultManager address from chain config
  const vaultManagerAddress = chainId
    ? ChainConfig[chainId]?.VAULT_MANAGER
    : undefined;

  const {
    assetList,
    getAssetData,
    loading: vaultLoading,
  } = useVaultManager({
    vaultManagerAddress,
  });

  const {
    balance,
    mintStablecoin,
    fetchBalance,
    getStablecoinMetadata,
    loading: stablecoinLoading,
    stablecoinAddress,
  } = useStablecoinMint({
    userAddress: address,
    onPrompt: () => {
      showAlert({
        kind: Alert_Kind__Enum_Type.PROGRESS,
        message:
          "Please confirm the stablecoin minting transaction in your wallet.",
      });
    },
    onSubmitted: (hash) => {
      showAlert({
        kind: Alert_Kind__Enum_Type.INFO,
        message: "Stablecoin minting transaction submitted successfully.",
      });
    },
    onSuccess: (receipt) => {
      showAlert({
        kind: Alert_Kind__Enum_Type.SUCCESS,
        message: "Stablecoin minted successfully!",
      });
      // Refresh balance after successful minting
      if (address) {
        fetchBalance();
      }
    },
    onError: (error) => {
      showAlert({
        kind: Alert_Kind__Enum_Type.ERROR,
        message: `Failed to mint stablecoin: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    },
  });

  // Add useToken hook for stablecoin metadata
  const {
    getTokenMetadata: getStablecoinTokenMetadata,
    loading: stablecoinMetadataLoading,
  } = useTokenApprove({
    token: stablecoinAddress,
    owner: address,
    spender: stablecoinAddress, // For metadata only, not approval
  });

  // Add state for stablecoin metadata
  const [stablecoinMetadata, setStablecoinMetadata] = useState<{
    symbol: string;
    name: string;
    decimals: number;
  } | null>(null);

  // Fetch stablecoin metadata when stablecoin address is available
  useEffect(() => {
    const fetchStablecoinMetadata = async () => {
      if (!stablecoinAddress) return;

      try {
        const metadata = await getStablecoinTokenMetadata();
        setStablecoinMetadata(metadata);
      } catch (error) {
        console.error("Error fetching stablecoin metadata:", error);
      }
    };

    fetchStablecoinMetadata();
  }, [stablecoinAddress, getStablecoinTokenMetadata]);

  const stablecoins = [
    {
      symbol: "sINR",
      name: "Stable Indian Rupee",
      available: "500M",
      rate: "1.00",
      fee: "0.1%",
    },
    {
      symbol: "sYEN",
      name: "Stable Japanese Yen",
      available: "180B",
      rate: "1.00",
      fee: "0.1%",
    },
    {
      symbol: "sEUR",
      name: "Stable Euro",
      available: "420M",
      rate: "1.00",
      fee: "0.1%",
    },
    {
      symbol: "sGBP",
      name: "Stable British Pound",
      available: "380M",
      rate: "1.00",
      fee: "0.1%",
    },
  ];

  // Fetch available countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/available-countries");
        if (response.ok) {
          const data = await response.json();
          setAvailableCountries(data.countries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch off-chain assets by country
  useEffect(() => {
    const fetchOffChainAssets = async () => {
      if (!selectedCountry) {
        setOffChainAssets({});
        setUserBalances({});
        return;
      }

      setLoadingAssets(true);
      try {
        const response = await fetch(
          `/api/assets-by-country?country=${selectedCountry}`
        );
        if (response.ok) {
          const data = await response.json();
          setOffChainAssets(data.assets);

          // Use actual demat holdings data instead of mock data
          const balances: { [key: string]: number } = {};

          if (userDematData && userDematData.holdings) {
            // Map demat holdings to balances for the selected country
            userDematData.holdings.forEach((holding) => {
              // Check if this asset belongs to the selected country
              if (data.assets[holding.assetSymbol]) {
                balances[holding.assetSymbol] = holding.valueInINR;
              }
            });
          }

          setUserBalances(balances);
        }
      } catch (error) {
        console.error("Error fetching off-chain assets:", error);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchOffChainAssets();
  }, [selectedCountry, userDematData]);

  // Update user balances when demat data changes
  useEffect(() => {
    if (
      userDematData &&
      selectedCountry &&
      Object.keys(offChainAssets).length > 0
    ) {
      const balances: { [key: string]: number } = {};

      userDematData.holdings.forEach((holding) => {
        // Check if this asset belongs to the selected country
        if (offChainAssets[holding.assetSymbol]) {
          balances[holding.assetSymbol] = holding.valueInINR;
        }
      });

      setUserBalances(balances);
    }
  }, [userDematData, selectedCountry, offChainAssets]);

  // Fetch ERC20 assets from VaultManager and get their metadata
  useEffect(() => {
    const fetchErc20AssetsFromVault = async () => {
      if (!assetList.length) return;

      const assetData: AssetData = {};
      const metadata: { [key: string]: TokenMetadata } = {};

      for (const assetAddress of assetList) {
        try {
          // Get asset data from VaultManager
          const vaultAssetData = await getAssetData(assetAddress);
          console.log("vaultAssetData", vaultAssetData);
          if (!vaultAssetData || !vaultAssetData.active) continue;

          // Get token metadata using direct contract calls
          const [symbol, name, decimals] = await Promise.all([
            readContract(config, {
              address: assetAddress,
              abi: parseAbi(["function symbol() view returns (string)"]),
              functionName: "symbol",
            }),
            readContract(config, {
              address: assetAddress,
              abi: parseAbi(["function name() view returns (string)"]),
              functionName: "name",
            }),
            readContract(config, {
              address: assetAddress,
              abi: parseAbi(["function decimals() view returns (uint8)"]),
              functionName: "decimals",
            }),
          ]);

          // Create asset key from symbol
          const assetKey = symbol as string;

          assetData[assetKey] = {
            name: name as string,
            tier: 1, // Default tier, could be enhanced
            haircutBP: Number(vaultAssetData.haircutBP),
            country: "IN", // Default country, could be enhanced
            decimals: decimals as number,
            yieldRate: 250, // Default yield rate
            address: assetAddress,
            symbol: symbol as string,
          };

          metadata[assetKey] = {
            symbol: symbol as string,
            name: name as string,
            decimals: decimals as number,
          };

          // Initialize ERC20 balance for this asset
          setErc20Balances((prev) => ({
            ...prev,
            [assetKey]: 0,
          }));
        } catch (error) {
          console.error(
            `Error fetching data for asset ${assetAddress}:`,
            error
          );
        }
      }

      setErc20Assets(assetData);
      setTokenMetadata(metadata);
    };

    fetchErc20AssetsFromVault();
  }, [assetList, getAssetData]);

  // Fetch token balances for all ERC20 assets
  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (!address || !Object.keys(erc20Assets).length) return;

      const newBalances: { [key: string]: number } = {};

      for (const [assetKey, asset] of Object.entries(erc20Assets)) {
        try {
          const balance = await readContract(config, {
            address: asset.address!,
            abi: parseAbi([
              "function balanceOf(address owner) view returns (uint256)",
            ]),
            functionName: "balanceOf",
            args: [address],
          });

          // Convert balance to human readable format
          console.log("balance", balance);
          const balanceNumber = Number(balance) / Math.pow(10, asset.decimals);
          newBalances[assetKey] = balanceNumber;
        } catch (error) {
          console.error(`Error fetching balance for ${assetKey}:`, error);
          newBalances[assetKey] = 0;
        }
      }

      setErc20Balances(newBalances);
    };

    fetchTokenBalances();
  }, [address, erc20Assets]);

  // Fetch user demat holdings
  useEffect(() => {
    const fetchUserDematHoldings = async () => {
      if (!address) return;

      setLoadingDemat(true);
      try {
        const response = await fetch(
          `/api/user-demat-holdings?address=${address}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserDematData(data);
        }
      } catch (error) {
        console.error("Error fetching user demat holdings:", error);
      } finally {
        setLoadingDemat(false);
      }
    };

    fetchUserDematHoldings();
  }, [address]);

  const calculateHaircut = (assetKey: string, amount: number) => {
    const asset = offChainAssets[assetKey] || erc20Assets[assetKey];
    if (!asset) return 0;
    return (amount * asset.haircutBP) / 10000; // Convert basis points to percentage
  };

  const calculateErc20Tokens = (assetKey: string, amount: number) => {
    const haircut = calculateHaircut(assetKey, amount);
    return amount - haircut;
  };

  const calculateStablecoinFee = (stablecoinSymbol: string, amount: number) => {
    const stablecoin = stablecoins.find((s) => s.symbol === stablecoinSymbol);
    if (!stablecoin) return 0;
    const feePercent = parseFloat(stablecoin.fee.replace("%", ""));
    return (amount * feePercent) / 100;
  };

  const handleDeposit = async () => {
    if (!selectedAsset || !depositAmount || !address) return;

    const amount = parseFloat(depositAmount);

    // Add debugging
    console.log("Deposit request:", {
      userAddress: address,
      assetSymbol: selectedAsset,
      assetName: offChainAssets[selectedAsset]?.name || selectedAsset,
      quantity: amount,
      valueInINR: amount,
    });

    console.log("Current user balances:", userBalances);
    console.log("Current demat data:", userDematData);

    try {
      // Call backend API to deposit collateral
      const response = await fetch("/api/deposit-collateral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: address,
          assetSymbol: selectedAsset,
          assetName: offChainAssets[selectedAsset]?.name || selectedAsset,
          quantity: amount,
          valueInINR: amount,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Deposit successful:", result);

        // Update local state
        setUserBalances((prev) => ({
          ...prev,
          [selectedAsset]: prev[selectedAsset] - amount,
        }));

        setErc20Balances((prev) => ({
          ...prev,
          [selectedAsset]:
            prev[selectedAsset] + calculateErc20Tokens(selectedAsset, amount),
        }));

        // Update demat data locally
        if (userDematData) {
          const updatedHoldings = userDematData.holdings.map((holding) => {
            if (holding.assetSymbol === selectedAsset) {
              return {
                ...holding,
                quantity: Math.max(
                  0,
                  holding.quantity - result.quantityDeducted || amount
                ),
                valueInINR: Math.max(0, holding.valueInINR - amount),
              };
            }
            return holding;
          });

          const newTotalValue = updatedHoldings.reduce(
            (total, holding) => total + holding.valueInINR,
            0
          );

          setUserDematData({
            ...userDematData,
            holdings: updatedHoldings,
            totalValue: newTotalValue,
          });
        }

        // Reset form
        setSelectedAsset("");
        setDepositAmount("");

        alert(`Deposit successful! Transaction ID: ${result.transactionId}`);
      } else {
        const error = await response.json();
        console.error("Deposit failed:", error);
        alert(`Deposit failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Error depositing collateral:", error);
      alert("Deposit failed. Please try again.");
    }
  };

  const handleMintStablecoin = async () => {
    if (!selectedStablecoin || !stablecoinAmount || !selectedAsset) return;

    const amount = parseFloat(stablecoinAmount);
    const fee = calculateStablecoinFee(selectedStablecoin, amount);
    const requiredErc20 = amount + fee;

    if (erc20Balances[selectedAsset] < requiredErc20) {
      showAlert({
        kind: Alert_Kind__Enum_Type.ERROR,
        message: "Insufficient ERC20 tokens for minting",
      });
      return;
    }

    try {
      // Convert amount to wei (assuming 18 decimals for stablecoin)
      const amountInWei = BigInt(Math.floor(amount * Math.pow(10, 18)));

      await mintStablecoin(amountInWei);

      // Update ERC20 balances (deduct the required amount)
      setErc20Balances((prev) => ({
        ...prev,
        [selectedAsset]: prev[selectedAsset] - requiredErc20,
      }));

      // Reset form
      setSelectedStablecoin("");
      setStablecoinAmount("");
      setSelectedAsset("");
    } catch (error) {
      // Error handling is now done by the hook callbacks
      console.error("Error minting stablecoin:", error);
    }
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-yellow-100 text-yellow-800";
      case 3:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTokenAmount = (amount: number, assetKey: string) => {
    const metadata = tokenMetadata[assetKey];
    if (!metadata) return amount.toFixed(2);

    const decimals = metadata.decimals;
    return (amount / Math.pow(10, decimals)).toFixed(decimals);
  };

  if (vaultLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-slate-600">Loading vault assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Collateral Management & Stablecoin Minting
            </h1>
            <p className="text-slate-600">
              Deposit off-chain assets, receive ERC20 tokens, and mint
              stablecoins
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Operation Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2" />
                  Asset Operations
                </CardTitle>
                <CardDescription>
                  Deposit off-chain assets and mint stablecoins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="deposit" className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      Deposit Assets
                    </TabsTrigger>
                    <TabsTrigger value="mint" className="flex items-center">
                      <ArrowUpCircle className="h-4 w-4 mr-2" />
                      Mint Stablecoins
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="deposit" className="space-y-6 mt-6">
                    {/* Country Selection */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Select Country
                      </label>
                      <Select
                        value={selectedCountry}
                        onValueChange={setSelectedCountry}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose country for assets" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
                          {availableCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <span className="text-lg mr-2">
                                    {country.flag}
                                  </span>
                                  <div>
                                    <span className="font-medium">
                                      {country.name}
                                    </span>
                                    <span className="text-sm text-slate-500 ml-2">
                                      ({country.currency})
                                    </span>
                                  </div>
                                </div>
                                <Badge variant="secondary">
                                  {country.totalAssets} assets
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Asset Selection */}
                    {selectedCountry && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Select Off-chain Asset
                        </label>
                        {loadingAssets ? (
                          <div className="flex items-center justify-center p-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-2"></div>
                            <span className="text-sm text-slate-600">
                              Loading assets...
                            </span>
                          </div>
                        ) : (
                          <Select
                            value={selectedAsset}
                            onValueChange={setSelectedAsset}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose asset to deposit" />
                            </SelectTrigger>
                            <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
                              {Object.entries(offChainAssets).map(
                                ([key, asset]) => (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center justify-between w-full">
                                      <div>
                                        <span className="font-medium">
                                          {key}
                                        </span>
                                        <span className="text-sm text-slate-500 ml-2">
                                          {asset.name}
                                        </span>
                                      </div>
                                      <Badge
                                        className={getTierColor(asset.tier)}
                                      >
                                        Tier {asset.tier}
                                      </Badge>
                                    </div>
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}

                    {/* Amount Input */}
                    {selectedAsset && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Deposit Amount (INR)
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter amount to deposit"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                        {selectedAsset && userBalances[selectedAsset] && (
                          <div className="text-xs text-slate-500 mt-1">
                            Available:{" "}
                            {userBalances[selectedAsset].toLocaleString()} INR
                          </div>
                        )}
                        <div className="text-xs text-blue-600 mt-2 p-2 bg-blue-50 rounded">
                          <strong>Note:</strong> This will trigger a Chainlink
                          function in the backend and will take your demat
                          holding into the GlobalAsset Rail custody. You will
                          receive soon the ERC20 representation of your
                          deposited collateral from which you can mint stables.
                        </div>
                      </div>
                    )}

                    {/* Transaction Summary */}
                    {selectedAsset && depositAmount && (
                      <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                        <div className="text-sm font-medium text-slate-900 mb-3">
                          Deposit Summary
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Asset:</span>
                          <span className="font-medium">
                            {offChainAssets[selectedAsset]?.name}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            Deposit Amount:
                          </span>
                          <span className="font-medium">
                            {depositAmount} INR
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            Haircut ({offChainAssets[selectedAsset]?.haircutBP}{" "}
                            BP):
                          </span>
                          <span className="font-medium text-red-600">
                            -
                            {calculateHaircut(
                              selectedAsset,
                              parseFloat(depositAmount)
                            ).toFixed(2)}{" "}
                            INR
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Yield Rate:</span>
                          <span className="font-medium text-green-600">
                            {offChainAssets[selectedAsset]?.yieldRate} BP
                          </span>
                        </div>

                        <div className="border-t border-slate-200 pt-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>ERC20 Tokens Received:</span>
                            <span className="text-green-600">
                              {calculateErc20Tokens(
                                selectedAsset,
                                parseFloat(depositAmount)
                              )}{" "}
                              {offChainAssets[selectedAsset]?.symbol}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full bg-black text-white py-3 px-4 rounded-md font-medium transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        !selectedCountry ||
                        !selectedAsset ||
                        !depositAmount ||
                        parseFloat(depositAmount) >
                          (userBalances[selectedAsset] || 0)
                      }
                      onClick={handleDeposit}
                      size="lg"
                    >
                      Deposit Asset & Mint ERC20
                    </Button>
                  </TabsContent>

                  <TabsContent value="mint" className="space-y-6 mt-6">
                    {/* ERC20 Token Selection */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Select ERC20 Token to Deposit
                      </label>
                      <Select
                        value={selectedAsset}
                        onValueChange={setSelectedAsset}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose ERC20 token" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
                          {Object.entries(erc20Balances).map(
                            ([key, balance]) => (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center justify-between w-full">
                                  <div>
                                    <span className="font-medium">{key}</span>
                                    <span className="text-sm text-slate-500 ml-2">
                                      {erc20Assets[key]?.name}
                                    </span>
                                  </div>
                                  <div className="text-sm text-slate-600">
                                    Balance: {balance}{" "}
                                    {erc20Assets[key]?.symbol}
                                  </div>
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Stablecoin Selection */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Select Stablecoin to Mint
                      </label>
                      <Select
                        value={selectedStablecoin}
                        onValueChange={setSelectedStablecoin}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose stablecoin" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
                          {stablecoins.map((coin) => (
                            <SelectItem key={coin.symbol} value={coin.symbol}>
                              <div className="flex items-center justify-between w-full">
                                <div>
                                  <span className="font-medium">
                                    {coin.symbol}
                                  </span>
                                  <span className="text-sm text-slate-500 ml-2">
                                    {coin.name}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Stablecoin Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount to mint"
                        value={stablecoinAmount}
                        onChange={(e) => setStablecoinAmount(e.target.value)}
                      />
                    </div>

                    {/* Transaction Summary */}
                    {selectedStablecoin &&
                      stablecoinAmount &&
                      selectedAsset && (
                        <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                          <div className="text-sm font-medium text-slate-900 mb-3">
                            Minting Summary
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">ERC20 Token:</span>
                            <span className="font-medium">{selectedAsset}</span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              Stablecoin Amount:
                            </span>
                            <span className="font-medium">
                              {stablecoinAmount} {selectedStablecoin}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              Protocol Fee:
                            </span>
                            <span className="font-medium text-red-600">
                              {calculateStablecoinFee(
                                selectedStablecoin,
                                parseFloat(stablecoinAmount)
                              ).toFixed(2)}{" "}
                              {selectedStablecoin}
                            </span>
                          </div>

                          <div className="border-t border-slate-200 pt-2">
                            <div className="flex justify-between text-sm font-medium">
                              <span>Total ERC20 Required:</span>
                              <span className="text-red-600">
                                {Number(stablecoinAmount) +
                                  calculateStablecoinFee(
                                    selectedStablecoin,
                                    parseFloat(stablecoinAmount)
                                  )}{" "}
                                {erc20Assets[selectedAsset]?.symbol}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                    <Button
                      className="w-full bg-black text-white py-3 px-4 rounded-md font-medium transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        !selectedStablecoin ||
                        !stablecoinAmount ||
                        !selectedAsset ||
                        parseFloat(stablecoinAmount) +
                          calculateStablecoinFee(
                            selectedStablecoin,
                            parseFloat(stablecoinAmount)
                          ) >
                          (erc20Balances[selectedAsset] || 0) ||
                        stablecoinLoading
                      }
                      onClick={handleMintStablecoin}
                      size="lg"
                    >
                      {stablecoinLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Minting...
                        </>
                      ) : (
                        "Mint Stablecoins"
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Available Assets - Moved below Asset Operations */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Available Assets
                </CardTitle>
                <CardDescription>
                  {selectedCountry
                    ? `${
                        availableCountries.find(
                          (c) => c.code === selectedCountry
                        )?.name
                      } assets`
                    : "Select a country to view assets"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedCountry ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-600">
                      Please select a country to view available assets
                    </p>
                  </div>
                ) : loadingAssets ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto mb-2"></div>
                    <p className="text-sm text-slate-600">Loading assets...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(offChainAssets).map(([key, asset]) => (
                      <div
                        key={key}
                        className="p-3 bg-white border border-slate-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-slate-900">
                            {key}
                          </div>
                          <Badge className={getTierColor(asset.tier)}>
                            Tier {asset.tier}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600 mb-2">
                          {asset.name}
                        </div>
                        <div className="text-xs text-slate-500 mb-2">
                          {asset.description}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-500">Haircut:</span>
                            <span className="ml-1 font-medium">
                              {asset.haircutBP} BP
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Yield:</span>
                            <span className="ml-1 font-medium text-green-600">
                              {asset.yieldRate} BP
                            </span>
                          </div>
                        </div>
                        {asset.availableSupply && (
                          <div className="text-xs text-slate-500 mt-1">
                            Supply: {asset.availableSupply} | Market Cap:{" "}
                            {asset.marketCap}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Balances */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  Your Demat Holdings
                </CardTitle>
                <CardDescription>
                  Current demat holdings of{" "}
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "your wallet"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingDemat ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto mb-2"></div>
                    <p className="text-sm text-slate-600">
                      Loading demat holdings...
                    </p>
                  </div>
                ) : userDematData ? (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-600 mb-2">
                      Demat Account: {userDematData.dematAccountNumber}
                    </div>

                    {/* Demat Holdings */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">
                        Demat Holdings
                      </h4>
                      <div className="space-y-2">
                        {userDematData.holdings.map((holding) => (
                          <div
                            key={holding.assetSymbol}
                            className="flex items-center justify-between p-2 bg-slate-50 rounded"
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {holding.assetSymbol}
                              </div>
                              <div className="text-xs text-slate-500">
                                {holding.assetName}
                              </div>
                              <div className="text-xs text-slate-500">
                                Qty: {holding.quantity}
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {holding.valueInINR.toLocaleString()} INR
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-200 pt-2 mt-3">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total Value:</span>
                          <span>
                            {userDematData.totalValue.toLocaleString()} INR
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ERC20 Tokens */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">
                        ERC20 Tokens
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(erc20Balances).map(([key, balance]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-2 bg-blue-50 rounded"
                          >
                            <div>
                              <div className="text-sm font-medium">{key}</div>
                              <div className="text-xs text-slate-500">
                                ERC20 Token
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {balance.toFixed(2)} {erc20Assets[key]?.symbol}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stablecoins */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">
                        Stablecoins
                      </h4>
                      <div className="space-y-2">
                        {stablecoinAddress && stablecoinMetadata && (
                          <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                            <div>
                              <div className="text-sm font-medium">
                                {stablecoinMetadata.symbol}
                              </div>
                              <div className="text-xs text-slate-500">
                                {stablecoinMetadata.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {stablecoinAddress.slice(0, 6)}...
                                {stablecoinAddress.slice(-4)}
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {stablecoinMetadataLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                              ) : (
                                `${(
                                  Number(balance) /
                                  Math.pow(10, stablecoinMetadata.decimals)
                                ).toFixed(2)} ${stablecoinMetadata.symbol}`
                              )}
                            </div>
                          </div>
                        )}

                        {/* Show loading state while fetching metadata */}
                        {stablecoinAddress &&
                          !stablecoinMetadata &&
                          stablecoinMetadataLoading && (
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <div>
                                <div className="text-sm font-medium">
                                  Loading...
                                </div>
                                <div className="text-xs text-slate-500">
                                  Fetching stablecoin data
                                </div>
                              </div>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                            </div>
                          )}

                        {/* Keep the mock stablecoins for now, but they won't be used for actual minting */}
                        {Object.entries(stablecoinBalances).map(
                          ([key, balance]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded opacity-50"
                            >
                              <div>
                                <div className="text-sm font-medium">{key}</div>
                                <div className="text-xs text-slate-500">
                                  Mock Stablecoin
                                </div>
                              </div>
                              <div className="text-sm font-medium">
                                {balance.toFixed(2)}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-600">
                      No demat holdings found
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintBurn;
