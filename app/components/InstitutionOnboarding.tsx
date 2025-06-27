"use client";
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
import { Label } from "@/app/components/ui/label";
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
  Building2,
  Shield,
  CheckCircle,
  AlertTriangle,
  Globe,
  TrendingUp,
} from "lucide-react";

const InstitutionOnboarding = () => {
  const [kycStep, setKycStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const countries = [
    { code: "IN", name: "India", currency: "INR", flag: "🇮🇳" },
    { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵" },
    { code: "EU", name: "European Union", currency: "EUR", flag: "🇪🇺" },
    { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧" },
  ];

  const assetTiers = {
    "Tier 1": {
      description: "Sovereign Bonds (10-30 days maturity)",
      haircut: "5%",
      color: "bg-green-100 text-green-800",
      assets: {
        IN: [
          "Indian Government Bonds",
          "Reserve Bank of India Securities",
          "State Development Loans",
        ],
        JP: [
          "Japanese Government Bonds",
          "Bank of Japan Bills",
          "Treasury Bills",
        ],
        EU: ["German Bunds", "French OATs", "European Central Bank Securities"],
        GB: ["UK Gilts", "Bank of England Bills", "Treasury Bills"],
      },
    },
    "Tier 2": {
      description: "Corporate Bonds (≤6 months tenor)",
      haircut: "15%",
      color: "bg-yellow-100 text-yellow-800",
      assets: {
        IN: [
          "HDFC Corporate Bonds",
          "Reliance Industries Debt",
          "Tata Steel Bonds",
        ],
        JP: [
          "Toyota Motor Bonds",
          "SoftBank Debt Securities",
          "Mitsubishi UFJ Bonds",
        ],
        EU: [
          "Siemens Corporate Bonds",
          "ASML Debt Securities",
          "Volkswagen Bonds",
        ],
        GB: [
          "BP Corporate Bonds",
          "Vodafone Debt Securities",
          "HSBC Subordinated Debt",
        ],
      },
    },
    "Tier 3": {
      description: "Equities & Alternative Assets",
      haircut: "25%",
      color: "bg-orange-100 text-orange-800",
      assets: {
        IN: ["Nifty 50 ETF", "Bank Nifty ETF", "Gold ETF (India)"],
        JP: ["Nikkei 225 ETF", "TOPIX ETF", "Japanese REIT ETF"],
        EU: ["Euro Stoxx 50 ETF", "DAX ETF", "European Gold ETF"],
        GB: ["FTSE 100 ETF", "UK Real Estate ETF", "London Gold ETF"],
      },
    },
  };

  const handleAssetToggle = (asset: string) => {
    setSelectedAssets((prev) =>
      prev.includes(asset) ? prev.filter((a) => a !== asset) : [...prev, asset]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Institution Onboarding
          </h1>
          <p className="text-slate-600">
            Complete KYC verification and configure your collateral vault
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= kycStep
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step < kycStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step < kycStep ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {kycStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Institution Information
                </CardTitle>
                <CardDescription>
                  Provide your institution details for KYC verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="institution-name">Institution Name</Label>
                  <Input
                    id="institution-name"
                    placeholder="Enter your institution name"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="institution-type">Institution Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial-bank">
                        Commercial Bank
                      </SelectItem>
                      <SelectItem value="investment-bank">
                        Investment Bank
                      </SelectItem>
                      <SelectItem value="asset-manager">
                        Asset Manager
                      </SelectItem>
                      <SelectItem value="insurance">
                        Insurance Company
                      </SelectItem>
                      <SelectItem value="pension-fund">Pension Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="primary-jurisdiction">
                    Primary Jurisdiction
                  </Label>
                  <Select
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.name} ({country.currency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>KYC Requirements:</strong> Your institution will
                      need to provide regulatory licenses, beneficial ownership
                      information, and compliance attestations. All data is
                      stored securely with on-chain verification signatures.
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setKycStep(2)}
                  disabled={!institutionName || !selectedCountry}
                >
                  Continue to Jurisdiction Setup
                </Button>
              </CardContent>
            </Card>
          )}

          {kycStep === 2 && selectedCountry && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  {countries.find((c) => c.code === selectedCountry)?.flag}{" "}
                  {countries.find((c) => c.code === selectedCountry)?.name}{" "}
                  Vault Configuration
                </CardTitle>
                <CardDescription>
                  Select eligible assets for your{" "}
                  {countries.find((c) => c.code === selectedCountry)?.currency}{" "}
                  collateral vault
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(assetTiers).map(([tier, config]) => (
                    <div
                      key={tier}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={config.color} variant="secondary">
                            {tier}
                          </Badge>
                          <div>
                            <div className="font-medium">
                              {config.description}
                            </div>
                            <div className="text-sm text-slate-500">
                              Haircut: {config.haircut}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {config.assets[
                          selectedCountry as keyof typeof config.assets
                        ]?.map((asset) => (
                          <label
                            key={asset}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedAssets.includes(asset)}
                              onChange={() => handleAssetToggle(asset)}
                              className="rounded"
                            />
                            <span className="text-sm">{asset}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setKycStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setKycStep(3)}
                    disabled={selectedAssets.length === 0}
                  >
                    Continue to Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {kycStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  KYC Verification & Attestation
                </CardTitle>
                <CardDescription>
                  Complete your onboarding with digital signature verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Ready for Verification
                    </h3>
                    <p className="text-green-700 mb-4">
                      Your institution setup is complete. Click below to sign
                      the on-chain attestation.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Configuration Summary:</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Institution:</strong> {institutionName}
                      </div>
                      <div>
                        <strong>Jurisdiction:</strong>{" "}
                        {
                          countries.find((c) => c.code === selectedCountry)
                            ?.name
                        }
                      </div>
                      <div>
                        <strong>Selected Assets:</strong>{" "}
                        {selectedAssets.length} assets across multiple tiers
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <strong>Digital Signature Required:</strong> By
                      proceeding, you attest that your institution has completed
                      all regulatory requirements and authorize minting
                      privileges for the selected asset classes. This creates an
                      immutable on-chain record.
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setKycStep(2)}>
                    Back
                  </Button>
                  <Button className="flex-1">
                    Sign Attestation & Complete Onboarding
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Country Vault Overview */}
        {selectedCountry && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Available Country Vaults</CardTitle>
              <CardDescription>
                Overview of asset tiers and yield opportunities by jurisdiction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className={`p-4 rounded-lg border-2 ${
                      selectedCountry === country.code
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{country.flag}</div>
                      <div className="font-medium">{country.name}</div>
                      <div className="text-sm text-slate-500 mb-3">
                        s{country.currency}
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Tier 1 Assets:</span>
                          <span>
                            {
                              assetTiers["Tier 1"].assets[
                                country.code as keyof (typeof assetTiers)["Tier 1"]["assets"]
                              ]?.length
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tier 2 Assets:</span>
                          <span>
                            {
                              assetTiers["Tier 2"].assets[
                                country.code as keyof (typeof assetTiers)["Tier 2"]["assets"]
                              ]?.length
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tier 3 Assets:</span>
                          <span>
                            {
                              assetTiers["Tier 3"].assets[
                                country.code as keyof (typeof assetTiers)["Tier 3"]["assets"]
                              ]?.length
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstitutionOnboarding;
