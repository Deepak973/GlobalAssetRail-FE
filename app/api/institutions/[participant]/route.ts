import { NextRequest, NextResponse } from "next/server";
import { InstitutionService } from "@/app/lib/services/institutionService";

export async function GET(
  request: NextRequest,
  { params }: { params: { participant: string } }
) {
  try {
    const institution = await InstitutionService.getInstitutionByParticipant(
      params.participant
    );

    if (!institution) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(institution);
  } catch (error) {
    console.error("Error fetching institution:", error);
    return NextResponse.json(
      { error: "Failed to fetch institution" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { participant: string } }
) {
  try {
    const body = await request.json();
    const success = await InstitutionService.updateInstitution(
      params.participant,
      body
    );

    if (!success) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating institution:", error);
    return NextResponse.json(
      { error: "Failed to update institution" },
      { status: 500 }
    );
  }
}
