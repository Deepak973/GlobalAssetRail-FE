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
  ArrowRight,
  Clock,
  DollarSign,
  Zap,
  Globe,
  CheckCircle,
} from "lucide-react";

const CrossBorder = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const currencies = [
    { symbol: "sINR", name: "Stable Indian Rupee", flag: "🇮🇳", rate: "83.20" },
    { symbol: "sYEN", name: "Stable Japanese Yen", flag: "🇯🇵", rate: "149.50" },
    { symbol: "sEUR", name: "Stable Euro", flag: "🇪🇺", rate: "0.92" },
    { symbol: "sGBP", name: "Stable British Pound", flag: "🇬🇧", rate: "0.81" },
    { symbol: "sUSD", name: "Stable US Dollar", flag: "🇺🇸", rate: "1.00" },
  ];

  const recentTransfers = [
    {
      id: "TX001",
      from: "sINR",
      to: "sYEN",
      amount: "100,000",
      received: "179,856",
      fee: "50",
      time: "2m ago",
      status: "completed",
    },
    {
      id: "TX002",
      from: "sEUR",
      to: "sGBP",
      amount: "50,000",
      received: "44,130",
      fee: "25",
      time: "5m ago",
      status: "completed",
    },
    {
      id: "TX003",
      from: "sUSD",
      to: "sINR",
      amount: "25,000",
      received: "2,080,000",
      fee: "12.5",
      time: "8m ago",
      status: "processing",
    },
  ];

  const calculateConversion = () => {
    if (!fromCurrency || !toCurrency || !amount)
      return { received: "0", fee: "0" };

    const fromRate =
      currencies.find((c) => c.symbol === fromCurrency)?.rate || "1";
    const toRate = currencies.find((c) => c.symbol === toCurrency)?.rate || "1";

    const amountInUSD = parseFloat(amount) / parseFloat(fromRate);
    const receivedAmount = amountInUSD * parseFloat(toRate);
    const fee = parseFloat(amount) * 0.001; // 0.1% fee

    return {
      received: receivedAmount.toFixed(2),
      fee: fee.toFixed(2),
    };
  };

  const { received, fee } = calculateConversion();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Cross-Border Payments
            </h1>
            <p className="text-slate-600">
              Instant international transfers with minimal fees
            </p>
          </div>
        </div>

        {/* Transfer Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">Instant Settlement</div>
              <div className="text-sm text-slate-600">~2 seconds</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">Low Fees</div>
              <div className="text-sm text-slate-600">0.1% protocol fee</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">Global Reach</div>
              <div className="text-sm text-slate-600">15+ countries</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="font-semibold">Guaranteed Peg</div>
              <div className="text-sm text-slate-600">1:1 fiat rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transfer Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Send Money Internationally</CardTitle>
              <CardDescription>
                Transfer between country-specific stablecoins instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Currency */}
              <div>
                <label className="text-sm font-medium mb-2 block">From</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Select
                      value={fromCurrency}
                      onValueChange={setFromCurrency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.symbol}
                            value={currency.symbol}
                          >
                            <div className="flex items-center space-x-2">
                              <span>{currency.flag}</span>
                              <span>{currency.symbol}</span>
                              <span className="text-sm text-slate-500">
                                ({currency.name})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Exchange Icon */}
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                </div>
              </div>

              {/* To Currency */}
              <div>
                <label className="text-sm font-medium mb-2 block">To</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies
                          .filter((c) => c.symbol !== fromCurrency)
                          .map((currency) => (
                            <SelectItem
                              key={currency.symbol}
                              value={currency.symbol}
                            >
                              <div className="flex items-center space-x-2">
                                <span>{currency.flag}</span>
                                <span>{currency.symbol}</span>
                                <span className="text-sm text-slate-500">
                                  ({currency.name})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    type="text"
                    placeholder="Received"
                    value={received}
                    readOnly
                    className="bg-slate-50"
                  />
                </div>
              </div>

              {/* Transfer Summary */}
              {fromCurrency && toCurrency && amount && (
                <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                  <div className="text-sm font-medium text-slate-900 mb-3">
                    Transfer Summary
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sending:</span>
                    <span className="font-medium">
                      {amount} {fromCurrency}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Protocol Fee:</span>
                    <span className="font-medium">
                      {fee} {fromCurrency}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Exchange Rate:</span>
                    <span className="font-medium">Market rate (real-time)</span>
                  </div>

                  <div className="border-t border-slate-200 pt-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Recipient Receives:</span>
                      <span>
                        {received} {toCurrency}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Settlement Time:</span>
                    <span className="font-medium text-green-600">
                      ~2 seconds
                    </span>
                  </div>
                </div>
              )}

              {/* Send Button */}
              <Button
                className="w-full"
                size="lg"
                disabled={!fromCurrency || !toCurrency || !amount}
              >
                Send {fromCurrency} → {toCurrency}
              </Button>

              {/* How it Works */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-2">
                  How Cross-Border Transfer Works
                </div>
                <div className="space-y-1 text-xs text-blue-800">
                  <div>1. Burn source stablecoin (e.g., sINR)</div>
                  <div>2. Oracle verifies exchange rate</div>
                  <div>3. Mint destination stablecoin (e.g., sYEN)</div>
                  <div>4. Transfer completed in ~2 seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transfers & Exchange Rates */}
          <div className="space-y-8">
            {/* Exchange Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Live Exchange Rates</CardTitle>
                <CardDescription>
                  Real-time rates for all supported stablecoins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currencies.map((currency) => (
                    <div
                      key={currency.symbol}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{currency.flag}</span>
                        <div>
                          <div className="font-medium text-slate-900">
                            {currency.symbol}
                          </div>
                          <div className="text-xs text-slate-500">
                            {currency.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {currency.rate}
                        </div>
                        <div className="text-xs text-slate-500">per USD</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
                <CardDescription>
                  Your latest cross-border transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransfers.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="p-3 bg-white border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{transfer.from}</Badge>
                          <ArrowRight className="h-3 w-3 text-slate-400" />
                          <Badge variant="outline">{transfer.to}</Badge>
                        </div>
                        <Badge
                          variant={
                            transfer.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {transfer.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-slate-500">Sent</div>
                          <div className="font-medium">{transfer.amount}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Received</div>
                          <div className="font-medium">{transfer.received}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Fee</div>
                          <div className="font-medium">{transfer.fee}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Time</div>
                          <div className="font-medium">{transfer.time}</div>
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

export default CrossBorder;
