import { Button } from "@/app/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-20 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Next-Generation Stablecoin Protocol
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Global On‑Demand
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {" "}
                Stablecoin{" "}
              </span>
              Protocol
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Country-specific over-collateralized stablecoins enabling
              traditional financial institutions to capture domestic yield and
              execute near-instant, low-cost cross-border payments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                >
                  Launch Protocol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
              <div>
                <div className="text-2xl font-bold text-slate-900">$2.4B+</div>
                <div className="text-sm text-slate-600">Total Value Locked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">15+</div>
                <div className="text-sm text-slate-600">
                  Supported Countries
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">120%+</div>
                <div className="text-sm text-slate-600">
                  Collateralization Ratio
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            {/* Enhanced Chainlink Powered Badge */}
            <div className="flex justify-center mb-8">
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with enhanced branding */}
                  <div className="flex items-center justify-center mb-4 space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-50 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 37.8 43.6"
                          className="w-7 h-7 text-blue-600"
                          fill="currentColor"
                        >
                          <path d="M18.9,0l-4,2.3L4,8.6,0,10.9V32.7L4,35l11,6.3,4,2.3,4-2.3L33.8,35l4-2.3V10.9l-4-2.3L22.9,2.3ZM8,28.1V15.5L18.9,9.2l10.9,6.3V28.1L18.9,34.4Z" />
                        </svg>
                      </div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 w-12 h-12 border-2 border-blue-400/50 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Powered by Chainlink
                      </span>
                    </div>
                  </div>

                  {/* Enhanced description */}
                  <div className="text-center mb-4">
                    <p className="text-blue-100 text-sm leading-relaxed font-medium">
                      Next-generation stablecoin protocol enabling
                      institutional-grade cross-border payments with domestic
                      yield capture.
                    </p>
                  </div>

                  {/* Feature badges */}
                  <div className="flex justify-center space-x-3 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <span className="text-blue-100 text-xs font-medium">
                        Oracle Network
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <span className="text-blue-100 text-xs font-medium">
                        Chainlink Functions
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <span className="text-blue-100 text-xs font-medium">
                        Secure
                      </span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-xs font-medium">
                      Infrastructure Active
                    </span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-indigo-300 rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/80 text-sm mb-1">sINR Pool</div>
                  <div className="text-white text-2xl font-bold">₹1.2B</div>
                  <div className="text-green-300 text-sm">+5.4% APY</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/80 text-sm mb-1">sYEN Pool</div>
                  <div className="text-white text-2xl font-bold">¥180B</div>
                  <div className="text-green-300 text-sm">+3.8% APY</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="text-white/80 text-sm mb-2">
                  Cross-Border Transfer
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">sINR</span>
                  <ArrowRight className="text-white/60" />
                  <span className="text-white">sYEN</span>
                </div>
                <div className="text-green-300 text-sm mt-1">
                  Settlement: ~2 seconds
                </div>
              </div>

              <div className="text-center">
                <div className="text-white/80 text-sm">Protocol Status</div>
                <div className="inline-flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-white font-medium">
                    All Systems Operational
                  </span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
