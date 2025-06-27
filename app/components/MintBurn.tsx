import { useState } from "react";
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
} from "lucide-react";

const MintBurn = () => {
  const [operation, setOperation] = useState("mint");
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

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

  const recentOperations = [
    {
      id: "1",
      type: "Mint",
      currency: "sINR",
      amount: "100,000",
      fee: "100",
      time: "2m ago",
      status: "completed",
    },
    {
      id: "2",
      type: "Burn",
      currency: "sYEN",
      amount: "50,000",
      fee: "50",
      time: "5m ago",
      status: "completed",
    },
    {
      id: "3",
      type: "Mint",
      currency: "sEUR",
      amount: "75,000",
      fee: "75",
      time: "8m ago",
      status: "pending",
    },
    {
      id: "4",
      type: "Burn",
      currency: "sGBP",
      amount: "25,000",
      fee: "25",
      time: "12m ago",
      status: "completed",
    },
  ];

  const calculateFee = () => {
    const selectedCoin = stablecoins.find((s) => s.symbol === selectedCurrency);
    if (!selectedCoin || !amount) return "0";
    const feePercent = parseFloat(selectedCoin.fee.replace("%", ""));
    return ((parseFloat(amount) * feePercent) / 100).toFixed(2);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Mint & Burn Operations
            </h1>
            <p className="text-slate-600">
              Issue new stablecoins or redeem existing tokens
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Operation Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="h-5 w-5 mr-2" />
                {operation === "mint" ? "Mint Stablecoins" : "Burn Stablecoins"}
              </CardTitle>
              <CardDescription>
                {operation === "mint"
                  ? "Create new stablecoins against your collateral"
                  : "Redeem stablecoins for underlying collateral"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Operation Type Selector */}
              <Tabs value={operation} onValueChange={setOperation}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mint" className="flex items-center">
                    <ArrowUpCircle className="h-4 w-4 mr-2" />
                    Mint
                  </TabsTrigger>
                  <TabsTrigger value="burn" className="flex items-center">
                    <ArrowDownCircle className="h-4 w-4 mr-2" />
                    Burn
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Currency Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Stablecoin
                </label>
                <Select
                  value={selectedCurrency}
                  onValueChange={setSelectedCurrency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stablecoin" />
                  </SelectTrigger>
                  <SelectContent>
                    {stablecoins.map((coin) => (
                      <SelectItem key={coin.symbol} value={coin.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <span className="font-medium">{coin.symbol}</span>
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
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <Input
                  type="number"
                  placeholder={`Enter amount to ${operation}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Transaction Details */}
              {selectedCurrency && amount && (
                <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                  <div className="text-sm font-medium text-slate-900 mb-3">
                    Transaction Summary
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Amount:</span>
                    <span className="font-medium">
                      {amount} {selectedCurrency}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Exchange Rate:</span>
                    <span className="font-medium">1:1 to base currency</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Protocol Fee:</span>
                    <span className="font-medium">
                      {calculateFee()} {selectedCurrency}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>
                        Total {operation === "mint" ? "Received" : "Required"}:
                      </span>
                      <span>
                        {operation === "mint"
                          ? (
                              parseFloat(amount) - parseFloat(calculateFee())
                            ).toFixed(2)
                          : amount}{" "}
                        {selectedCurrency}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Button
                className="w-full"
                disabled={!selectedCurrency || !amount}
                size="lg"
              >
                {operation === "mint" ? "Mint Tokens" : "Burn Tokens"}
              </Button>

              {/* Warning Message */}
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <strong>Important:</strong>{" "}
                    {operation === "mint"
                      ? "Ensure sufficient collateral ratio (≥120%) before minting. NAV will be verified via oracle before execution."
                      : "Burning will release proportional collateral. Settlement may take up to 24 hours for bond redemptions."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Stablecoins & Recent Operations */}
          <div className="space-y-8">
            {/* Available Stablecoins */}
            <Card>
              <CardHeader>
                <CardTitle>Available Stablecoins</CardTitle>
                <CardDescription>
                  Current pools and their liquidity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stablecoins.map((coin) => (
                    <div
                      key={coin.symbol}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {coin.symbol.slice(1)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {coin.symbol}
                          </div>
                          <div className="text-xs text-slate-500">
                            {coin.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {coin.available}
                        </div>
                        <div className="text-xs text-slate-500">Available</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Operations</CardTitle>
                <CardDescription>
                  Your latest mint and burn transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOperations.map((op) => (
                    <div
                      key={op.id}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(op.status)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-900">
                              {op.type}
                            </span>
                            <Badge
                              variant={
                                op.type === "Mint" ? "default" : "secondary"
                              }
                            >
                              {op.currency}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-500">
                            {op.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{op.amount}</div>
                        <div className="text-xs text-slate-500">
                          Fee: {op.fee}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintBurn;
