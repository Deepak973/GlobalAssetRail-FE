import { NextRequest, NextResponse } from "next/server";

// Mock data for assets by country
const assetsByCountry = {
  IN: {
    "INR-SGB": {
      name: "Indian Government Bonds",
      tier: 1,
      haircutBP: 500, // 5%
      country: "IN",
      decimals: 18,
      yieldRate: 250,
      symbol: "INR-SGB",
      description: "Sovereign Government Bonds (10-30 days maturity)",
      availableSupply: "2.5T",
      marketCap: "45.2B",
    },
    "INR-CORP": {
      name: "HDFC Corporate Bonds",
      tier: 2,
      haircutBP: 1500, // 15%
      country: "IN",
      decimals: 18,
      yieldRate: 350,
      symbol: "INR-CORP",
      description: "Corporate Bonds (≤6 months tenor)",
      availableSupply: "1.8T",
      marketCap: "28.7B",
    },
    "INR-MFD": {
      name: "Nifty 50 ETF",
      tier: 3,
      haircutBP: 2500, // 25%
      country: "IN",
      decimals: 18,
      yieldRate: 450,
      symbol: "INR-MFD",
      description: "Equities & Alternative Assets",
      availableSupply: "950B",
      marketCap: "15.3B",
    },
  },
  JP: {
    "JPY-GOV": {
      name: "Japanese Government Bonds",
      tier: 1,
      haircutBP: 500,
      country: "JP",
      decimals: 18,
      yieldRate: 150,
      symbol: "JPY-GOV",
      description: "Sovereign Government Bonds (10-30 days maturity)",
      availableSupply: "1.2T",
      marketCap: "32.1B",
    },
    "JPY-CORP": {
      name: "Toyota Motor Bonds",
      tier: 2,
      haircutBP: 1500,
      country: "JP",
      decimals: 18,
      yieldRate: 250,
      symbol: "JPY-CORP",
      description: "Corporate Bonds (≤6 months tenor)",
      availableSupply: "850B",
      marketCap: "22.4B",
    },
    "JPY-ETF": {
      name: "Nikkei 225 ETF",
      tier: 3,
      haircutBP: 2500,
      country: "JP",
      decimals: 18,
      yieldRate: 380,
      symbol: "JPY-ETF",
      description: "Equities & Alternative Assets",
      availableSupply: "420B",
      marketCap: "12.8B",
    },
  },
  EU: {
    "EUR-BUND": {
      name: "German Bunds",
      tier: 1,
      haircutBP: 500,
      country: "EU",
      decimals: 18,
      yieldRate: 200,
      symbol: "EUR-BUND",
      description: "Sovereign Government Bonds (10-30 days maturity)",
      availableSupply: "1.8T",
      marketCap: "38.5B",
    },
    "EUR-CORP": {
      name: "Siemens Corporate Bonds",
      tier: 2,
      haircutBP: 1500,
      country: "EU",
      decimals: 18,
      yieldRate: 300,
      symbol: "EUR-CORP",
      description: "Corporate Bonds (≤6 months tenor)",
      availableSupply: "1.2T",
      marketCap: "25.9B",
    },
    "EUR-ETF": {
      name: "Euro Stoxx 50 ETF",
      tier: 3,
      haircutBP: 2500,
      country: "EU",
      decimals: 18,
      yieldRate: 420,
      symbol: "EUR-ETF",
      description: "Equities & Alternative Assets",
      availableSupply: "680B",
      marketCap: "18.7B",
    },
  },
  GB: {
    "GBP-GILT": {
      name: "UK Gilts",
      tier: 1,
      haircutBP: 500,
      country: "GB",
      decimals: 18,
      yieldRate: 180,
      symbol: "GBP-GILT",
      description: "Sovereign Government Bonds (10-30 days maturity)",
      availableSupply: "950B",
      marketCap: "28.3B",
    },
    "GBP-CORP": {
      name: "BP Corporate Bonds",
      tier: 2,
      haircutBP: 1500,
      country: "GB",
      decimals: 18,
      yieldRate: 280,
      symbol: "GBP-CORP",
      description: "Corporate Bonds (≤6 months tenor)",
      availableSupply: "720B",
      marketCap: "19.6B",
    },
    "GBP-ETF": {
      name: "FTSE 100 ETF",
      tier: 3,
      haircutBP: 2500,
      country: "GB",
      decimals: 18,
      yieldRate: 400,
      symbol: "GBP-ETF",
      description: "Equities & Alternative Assets",
      availableSupply: "380B",
      marketCap: "14.2B",
    },
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    if (!country) {
      return NextResponse.json(
        { error: "Country parameter is required" },
        { status: 400 }
      );
    }

    const countryAssets =
      assetsByCountry[country as keyof typeof assetsByCountry];

    if (!countryAssets) {
      return NextResponse.json(
        { error: "Country not supported" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      country,
      assets: countryAssets,
      totalAssets: Object.keys(countryAssets).length,
    });
  } catch (error) {
    console.error("Error fetching assets by country:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
