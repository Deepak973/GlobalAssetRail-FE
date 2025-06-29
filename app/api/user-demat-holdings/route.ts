import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const userDematData = await db.collection("userDematHoldings").findOne({
      userAddress: address,
    });

    if (!userDematData) {
      return NextResponse.json(
        { error: "User demat holdings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userDematData);
  } catch (error) {
    console.error("Error fetching user demat holdings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
