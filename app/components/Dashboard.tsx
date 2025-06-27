import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Globe,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("24h");

  const stablecoins = [
    {
      symbol: "sINR",
      name: "Stable INR",
      tvl: "₹1.2B",
      apy: "5.4%",
      ratio: "125.8%",
      status: "healthy",
    },
    {
      symbol: "sYEN",
      name: "Stable YEN",
      tvl: "¥180B",
      apy: "3.8%",
      ratio: "122.1%",
      status: "healthy",
    },
    {
      symbol: "sEUR",
      name: "Stable EUR",
      tvl: "€420M",
      apy: "4.2%",
      ratio: "128.5%",
      status: "healthy",
    },
    {
      symbol: "sGBP",
      name: "Stable GBP",
      tvl: "£380M",
      apy: "4.8%",
      ratio: "124.3%",
      status: "healthy",
    },
  ];

  const recentTransactions = [
    {
      id: "0x1a2b",
      type: "Mint",
      amount: "100,000 sINR",
      time: "2m ago",
      status: "confirmed",
    },
    {
      id: "0x3c4d",
      type: "Cross-Border",
      amount: "50,000 sYEN → sEUR",
      time: "5m ago",
      status: "confirmed",
    },
    {
      id: "0x5e6f",
      type: "Burn",
      amount: "75,000 sGBP",
      time: "8m ago",
      status: "confirmed",
    },
    {
      id: "0x7g8h",
      type: "Mint",
      amount: "200,000 sEUR",
      time: "12m ago",
      status: "confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Chainlink Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Protocol Dashboard
            </h1>
            <p className="text-slate-600">
              Monitor and manage your stablecoin operations
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline">Export Data</Button>
            <Button>New Transaction</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total TVL</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4B</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Pools
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> new this quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Collateral Ratio
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125.4%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1.2%</span> above target
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$127M</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-slate-600">0.0%</span> from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stablecoin Pools */}
          <Card>
            <CardHeader>
              <CardTitle>Stablecoin Pools</CardTitle>
              <CardDescription>
                Overview of all active country-specific pools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stablecoins.map((coin, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {coin.symbol.slice(1)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {coin.symbol}
                        </div>
                        <div className="text-sm text-slate-500">
                          {coin.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{coin.tvl}</div>
                      <div className="text-sm text-green-600">
                        {coin.apy} APY
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          coin.status === "healthy" ? "default" : "destructive"
                        }
                      >
                        {coin.ratio}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest protocol activity and settlements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          tx.type === "Mint"
                            ? "bg-green-500"
                            : tx.type === "Burn"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {tx.type}
                        </div>
                        <div className="text-sm text-slate-500">
                          {tx.amount}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">{tx.time}</div>
                      <Badge variant="outline" className="text-xs">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Protocol Health */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Protocol Health Monitor</CardTitle>
            <CardDescription>
              Real-time system status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-semibold text-green-800">
                  Oracle Network
                </div>
                <div className="text-2xl font-bold text-green-900 my-1">
                  100%
                </div>
                <div className="text-sm text-green-600">
                  All feeds operational
                </div>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div className="font-semibold text-blue-800">
                  Collateral Health
                </div>
                <div className="text-2xl font-bold text-blue-900 my-1">
                  Safe
                </div>
                <div className="text-sm text-blue-600">
                  All ratios above minimum
                </div>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <div className="font-semibold text-purple-800">
                  Network Status
                </div>
                <div className="text-2xl font-bold text-purple-900 my-1">
                  2.1s
                </div>
                <div className="text-sm text-purple-600">
                  Avg settlement time
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
