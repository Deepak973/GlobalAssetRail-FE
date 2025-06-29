import { NextRequest, NextResponse } from "next/server";

const availableCountries = [
  {
    code: "IN",
    name: "India",
    currency: "INR",
    flag: "🇮🇳",
    description: "Indian financial markets and assets",
    totalAssets: 3,
    totalMarketCap: "89.2B",
  },
  {
    code: "JP",
    name: "Japan",
    currency: "JPY",
    flag: "🇯🇵",
    description: "Japanese financial markets and assets",
    totalAssets: 3,
    totalMarketCap: "67.3B",
  },
  {
    code: "EU",
    name: "European Union",
    currency: "EUR",
    flag: "🇪🇺",
    description: "European financial markets and assets",
    totalAssets: 3,
    totalMarketCap: "83.1B",
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    flag: "🇬🇧",
    description: "UK financial markets and assets",
    totalAssets: 3,
    totalMarketCap: "62.1B",
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      countries: availableCountries,
      totalCountries: availableCountries.length,
    });
  } catch (error) {
    console.error("Error fetching available countries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
