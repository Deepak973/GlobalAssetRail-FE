import { NextRequest, NextResponse } from "next/server";
import { InstitutionService } from "@/app/lib/services/institutionService";
import { serializeBigInt } from "@/app/lib/utils/serializeBigInt";

export async function GET() {
  try {
    const institutions = await InstitutionService.getAllInstitutions();
    return NextResponse.json(serializeBigInt(institutions));
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return NextResponse.json(
      { error: "Failed to fetch institutions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Convert contractRegistrationTimestamp from string to BigInt
    const processedBody = {
      ...body,
      contractRegistrationTimestamp: BigInt(body.contractRegistrationTimestamp),
    };

    const institution = await InstitutionService.createInstitution(
      processedBody
    );
    return NextResponse.json(serializeBigInt(institution), { status: 201 });
  } catch (error) {
    console.error("Error creating institution:", error);
    return NextResponse.json(
      { error: "Failed to create institution" },
      { status: 500 }
    );
  }
}
