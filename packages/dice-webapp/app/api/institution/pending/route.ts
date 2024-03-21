import { NextResponse } from "next/server";
import { getPendingOrganizations } from "@/components/utils/get-db-data";
import { authorizeUser, getErrorMessage } from "@/components/apiutils/common";

export async function GET() {
  try {
    await authorizeUser();
    let pendingRequests = await getPendingOrganizations();
    return NextResponse.json(pendingRequests);
  } catch (e: unknown) {
    let errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
