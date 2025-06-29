"use client";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ArrowRight, Shield, Globe, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import Hero from "./Hero";
import ProtocolOverview from "./ProtocolOverview";
import MetricsGrid from "./MetricsGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Hero />
      <ProtocolOverview />
      <MetricsGrid />

      {/* Key Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Our Protocol?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Revolutionary stablecoin infrastructure designed for
            institutional-grade performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Over-Collateralized",
              description:
                "120%+ collateralization ensures peg stability and risk mitigation",
            },
            {
              icon: Globe,
              title: "Global Reach",
              description:
                "Country-specific stablecoins for seamless cross-border payments",
            },
            {
              icon: TrendingUp,
              title: "Yield Generation",
              description:
                "Capture domestic yields while maintaining liquidity",
            },
            {
              icon: Zap,
              title: "Instant Settlement",
              description:
                "Near-instant cross-border payments with minimal fees",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Cross-Border Payments?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading financial institutions already using our protocol for
            efficient, yield-generating stablecoin operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/institution-onboarding">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Index;
