import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MetricsGrid = () => {
  const metrics = [
    {
      title: "Total Value Locked",
      value: "$2.4B",
      change: "+12.5%",
      trend: "up",
      subtitle: "Across all vaults",
    },
    {
      title: "Active Stablecoins",
      value: "15",
      change: "+3",
      trend: "up",
      subtitle: "Country-specific tokens",
    },
    {
      title: "Average APY",
      value: "4.8%",
      change: "-0.2%",
      trend: "down",
      subtitle: "Weighted by TVL",
    },
    {
      title: "24h Volume",
      value: "$127M",
      change: "0.0%",
      trend: "neutral",
      subtitle: "Cross-border settlements",
    },
    {
      title: "Collateral Ratio",
      value: "125.4%",
      change: "+1.2%",
      trend: "up",
      subtitle: "Protocol-wide average",
    },
    {
      title: "Insurance Pool",
      value: "$48M",
      change: "+5.8%",
      trend: "up",
      subtitle: "Risk mitigation fund",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Protocol Metrics
          </h2>
          <p className="text-xl text-slate-600">
            Real-time insights into protocol performance and health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-3xl font-bold text-slate-900">
                    {metric.value}
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${getTrendColor(
                      metric.trend
                    )}`}
                  >
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{metric.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Status Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <div className="font-semibold text-green-800">
                    All Systems Operational
                  </div>
                  <div className="text-sm text-green-600">
                    No active incidents
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-blue-800">
                    Oracle Health: 100%
                  </div>
                  <div className="text-sm text-blue-600">
                    All price feeds active
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-purple-800">
                    Network Status: Optimal
                  </div>
                  <div className="text-sm text-purple-600">
                    Avg. settlement: 2.1s
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MetricsGrid;
