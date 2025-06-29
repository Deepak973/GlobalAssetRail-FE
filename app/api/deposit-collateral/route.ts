import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { updateUserDematHoldings } from "@/scripts/update-user-demat-holdings";
import { updateCompanyCustody } from "@/scripts/update-company-custody";

export async function POST(request: NextRequest) {
  try {
    const { userAddress, assetSymbol, assetName, quantity, valueInINR } =
      await request.json();

    // Validate input
    if (
      !userAddress ||
      !assetSymbol ||
      !assetName ||
      !quantity ||
      !valueInINR
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if user has sufficient holdings - FIXED QUERY
    const userHoldings = await db.collection("userDematHoldings").findOne({
      userAddress: userAddress,
    });

    if (!userHoldings) {
      return NextResponse.json(
        { error: "User holdings not found" },
        { status: 404 }
      );
    }

    // Find the specific asset holding
    const assetHolding = userHoldings.holdings.find(
      (holding: any) => holding.assetSymbol === assetSymbol
    );

    if (!assetHolding) {
      return NextResponse.json(
        { error: `Asset ${assetSymbol} not found in user holdings` },
        { status: 404 }
      );
    }

    // Check if user has sufficient value (not quantity)
    if (assetHolding.valueInINR < valueInINR) {
      return NextResponse.json(
        {
          error: "Insufficient holdings",
          available: assetHolding.valueInINR,
          requested: valueInINR,
          assetSymbol: assetSymbol,
        },
        { status: 400 }
      );
    }

    // Calculate the quantity to deduct based on value ratio
    const valueRatio = valueInINR / assetHolding.valueInINR;
    const quantityToDeduct = Math.floor(assetHolding.quantity * valueRatio);

    // Update user demat holdings (deduct)
    await updateUserDematHoldings(
      userAddress,
      assetSymbol,
      quantityToDeduct,
      valueInINR,
      "deduct"
    );

    // Update company custody (add)
    await updateCompanyCustody(
      userAddress,
      assetSymbol,
      assetName,
      quantityToDeduct,
      valueInINR
    );

    // TODO: Trigger Chainlink function here
    // This would be the actual blockchain interaction
    console.log("Triggering Chainlink function for asset deposit...");

    return NextResponse.json({
      success: true,
      message: "Asset deposited successfully",
      transactionId: `TXN_${Date.now()}`,
      depositedAmount: valueInINR,
      assetSymbol: assetSymbol,
      quantityDeducted: quantityToDeduct,
    });
  } catch (error) {
    console.error("Error in deposit collateral API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
