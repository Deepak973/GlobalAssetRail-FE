import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ArrowRight, Coins, Building, CreditCard } from "lucide-react";

const ProtocolOverview = () => {
  const steps = [
    {
      icon: Building,
      title: "Institutional Onboarding",
      description:
        "Banks deposit domestic assets (bonds, equities, gold) as collateral through regulated custodians",
      details:
        "KYC verification, off-chain custody attestation, multi-tier asset eligibility",
    },
    {
      icon: Coins,
      title: "Stablecoin Minting",
      description:
        "Over-collateralized country-specific stablecoins (sINR, sYEN) minted against deposited assets",
      details:
        "120%+ collateralization ratio, real-time NAV calculation via Chainlink oracles",
    },
    {
      icon: CreditCard,
      title: "Cross-Border Settlement",
      description:
        "Instant mint-burn-remint cycles enable seamless international payments with minimal fees",
      details:
        "Dynamic fee adjustment, AMM arbitrage incentives, insurance vault protection",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A revolutionary three-step process that transforms traditional
            cross-border payments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-600">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <step.icon className="h-12 w-12 text-blue-600" />
                    <span className="text-3xl font-bold text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">{step.details}</p>
                </CardContent>
              </Card>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-8 w-8 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Technical Architecture Preview */}
        <div className="mt-20 bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Technical Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Vault Manager", desc: "Collateral tracking & NAV" },
              { name: "Oracle Network", desc: "Chainlink price feeds" },
              { name: "Peg Controller", desc: "Dynamic fee adjustment" },
              { name: "Bridge Adapter", desc: "Cross-chain messaging" },
            ].map((component, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {component.name[0]}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  {component.name}
                </h4>
                <p className="text-sm text-slate-600">{component.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtocolOverview;
